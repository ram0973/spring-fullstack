import {
  Breadcrumbs,
  Button,
  Container,
  FileInput,
  Group,
  Image,
  Input,
  Paper,
  Select,
  Switch,
  TagsInput,
  Text,
  Textarea,
  TextInput,
  Title
} from '@mantine/core';
import {Link, useNavigate, useParams} from 'react-router-dom';
import classes from "@/pages/posts/update/UpdatePost.module.css";
import React, {useEffect, useState} from 'react';
import {useForm} from '@mantine/form';
import {AxiosError} from "axios";
import {AxiosErrorResponseDto} from "@/common/axios/AxiosErrorResponseDto.ts";
import {zodResolver} from "mantine-form-zod-resolver";
import z from "zod";
import {postUpdateSchema} from "@/pages/posts/update/zod.ts";
import {useGetPost} from "@/pages/posts/view/useGetPost.ts";
import {Post} from "@/pages/posts";
import {useUpdatePost} from "@/pages/posts/update/useUpdatePost.ts";
import '@mantine/code-highlight/styles.css';
import '@mantine/tiptap/styles.css';
import {useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {Underline} from "@tiptap/extension-underline";
import TextAlign from '@tiptap/extension-text-align';
import {RichTextEditor} from '@mantine/tiptap';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import {createLowlight} from 'lowlight';
import ts from 'highlight.js/lib/languages/typescript';
import {useGetTags} from "@/pages/posts/update/useGetTags.ts";
import {useGetCategories} from "@/pages/posts/update/useGetCategories.ts";
import {notifications} from "@mantine/notifications";

export const UpdatePost = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const updatePostMutation = useUpdatePost()
  const errorData = (updatePostMutation.error as AxiosError)?.response?.data as AxiosErrorResponseDto // TODO: Use or remove
  const navigate = useNavigate();

  const {id} = useParams();
  const post: Post = useGetPost(id).data;
  const tags = useGetTags().data?.postTags.map(item => item.title);
  const categories = useGetCategories().data?.postCategories.map(item => item.title);

  const lowlight = createLowlight();
  lowlight.register({ts});

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      //Link, // TODO: import link with full names
      TextAlign.configure({types: ['heading', 'paragraph']}),
      CodeBlockLowlight.configure({lowlight}),
    ],
    content: post?.content,
  });

  const onSubmitHandler = async () => {
    //event.preventDefault();

    form.setFieldValue("content", editor.getHTML());
    const formData = form.getValues();
    // TODO: convert to DTO
    // @ts-ignore
    formData['tags'] = ([].concat(selectedTags)).toString();

    //formData['content'] = content;

    console.log(formData);
    const response = updatePostMutation.mutateAsync(formData)
      .catch(
        (error) => {
          console.log(error);
          notifications.show({
              color: 'red',
              title: 'Error',
              message: (error as AxiosError)?.response?.data?.message
            }
          );
        }
      )
    //navigate(`/admin/posts/view/${response.data?.id}`);
    // TODO: server validation, handle errors
    console.log(formData);
    navigate('/admin/posts');
  }

  const form = useForm<z.infer<typeof postUpdateSchema>>( //createFormContext<z.infer<typeof postUpdateSchema>>();
    {
      mode: 'uncontrolled',
      validate: zodResolver(postUpdateSchema),
      validateInputOnChange: true,
      //initialValues: {"enabled": false}
    }
  );

  useEffect(() => {
    form.setValues(post);
    form.setFieldValue('image', null);
    form.setFieldValue('category', post?.category?.title);
    setSelectedTags(post?.tags);
    form.resetDirty(post);
  }, [post, tags, categories]);

  const items = [
    {title: 'Posts', href: '/admin/posts'},
    {title: 'Update', href: '#'},
  ].map((item, index) => (
    (item.href !== '#') ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
  ));

  //const [content, setContent] = useState<string>("");

  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Container>
        <Title ta="center" className={classes.title}>
          Update post
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={onSubmitHandler}>
            <TextInput {...form.getInputProps('title')} key={form.key('title')}
                       label="Title" placeholder="Title"/>
            <TextInput {...form.getInputProps('slug')} key={form.key('slug')}
                       label="Slug" placeholder="Slug"/>
            <Select {...form.getInputProps('category')} key={form.key('category')}
                    label="Category"
                    placeholder="Pick value"
                    data={categories}/>
            <Group grow>
              {post?.image && (<Image src={post?.image} h={75} w="auto" fit="contain" mt={10}/>)}
              <FileInput {...form.getInputProps('image')} key={form.key('image')}
                         accept="image/png,image/jpeg,image/webp"
                         clearable label="Post image" placeholder="Upload post image file"/>
            </Group>
            <Textarea {...form.getInputProps('excerpt')} key={form.key('excerpt')}
                      autosize resize="vertical" minRows={2} label="Post excerpt" placeholder="Post excerpt"/>
            <Input.Wrapper withAsterisk label="Post content">
              <RichTextEditor editor={editor} mih={200} {...form.getInputProps('content')} key={form.key('content')}>
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold/>
                    <RichTextEditor.Italic/>
                    <RichTextEditor.Underline/>
                    <RichTextEditor.Strikethrough/>
                    <RichTextEditor.ClearFormatting/>
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1/>
                    <RichTextEditor.H2/>
                    <RichTextEditor.H3/>
                    <RichTextEditor.H4/>
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote/>
                    <RichTextEditor.Hr/>
                    <RichTextEditor.BulletList/>
                    <RichTextEditor.OrderedList/>
                    <RichTextEditor.Subscript/>
                    <RichTextEditor.Superscript/>
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link/>
                    <RichTextEditor.Unlink/>
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft/>
                    <RichTextEditor.AlignCenter/>
                    <RichTextEditor.AlignJustify/>
                    <RichTextEditor.AlignRight/>
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Undo/>
                    <RichTextEditor.Redo/>
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.CodeBlock/>
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content/>
              </RichTextEditor>
            </Input.Wrapper>
            <TagsInput
              label="Post tags"
              placeholder="Pick value or enter anything"
              data={tags}
              comboboxProps={{position: 'top', middlewares: {flip: false, shift: false}}}
              value={selectedTags}
              onChange={event => setSelectedTags(event)}/>
            <Switch {...form.getInputProps('enabled', {type: 'checkbox'})} key={form.key('enabled')}
                    label="Enabled" onLabel="ON" offLabel="OFF" mt={"md"}/>
            <Button type={"submit"} mt="xl" key={"button"}>Update</Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}
