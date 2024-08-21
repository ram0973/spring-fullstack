import {
  Breadcrumbs,
  Button,
  Container,
  FileInput,
  Group,
  Image,
  Paper,
  Select,
  Switch,
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

export const UpdatePost = () => {
  const updatePostMutation = useUpdatePost()
  const errorData = (updatePostMutation.error as AxiosError)?.response?.data as AxiosErrorResponseDto // TODO: Use or remove
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    const formData = form.getValues();
    const response = await updatePostMutation.mutateAsync(formData);
    //navigate(`/admin/posts/view/${response.data?.id}`);
    // TODO: server validation, handle errors
    console.log(formData);
    navigate('/admin/posts');
  }

  const {id} = useParams();
  const initialData: Post = useGetPost(id).data;

  const form = useForm<z.infer<typeof postUpdateSchema>>({
    mode: 'uncontrolled',
    validate: zodResolver(postUpdateSchema),
    validateInputOnChange: true,
    initialValues: {"enabled": false}
  });

  useEffect(() => {
    form.setValues(initialData);
    form.resetDirty(initialData);
  }, [initialData]);

  const items = [
    {title: 'Posts', href: '/admin/posts'},
    {title: 'Update', href: '#'},
  ].map((item, index) => (
    (item.href !== '#') ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
  ));

  const [content, setContent] = useState<string>("");

  const lowlight = createLowlight();
  lowlight.register({ts});

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      TextAlign.configure({types: ['heading', 'paragraph']}),
      CodeBlockLowlight.configure({lowlight}),
    ],
    content,
  });

  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Container>
        <Title ta="center" className={classes.title}>
          Update post
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(onSubmitHandler)}>
            <TextInput {...form.getInputProps('title')} key={form.key('title')}
                       label="Title" placeholder="Title"/>
            <TextInput {...form.getInputProps('slug')} key={form.key('slug')}
                       label="Slug" placeholder="Slug"/>
            <Select
              label="Category"
              placeholder="Pick value"
              data={['React', 'Angular', 'Vue', 'Svelte']}
            />
            <Group grow>
              {initialData?.image && (<Image src={initialData?.image} h={75} w="auto" fit="contain" mt={10}/>)}
              <FileInput {...form.getInputProps('image')} key={form.key('image')}
                         accept="image/png,image/jpeg"
                         clearable label="Post image" placeholder="Upload post image file"/>
            </Group>
            <Textarea {...form.getInputProps('excerpt')} key={form.key('excerpt')}
                      autosize resize="vertical" minRows={2} label="Post excerpt" placeholder="Post excerpt"/>
            <Text size="sm" fw={500}>Post content</Text>
            <RichTextEditor editor={editor} mih={200}>
              <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold/>
                  <RichTextEditor.Italic/>
                  <RichTextEditor.Underline/>
                  <RichTextEditor.Strikethrough/>
                  <RichTextEditor.ClearFormatting/>
                  <RichTextEditor.Highlight/>
                  <RichTextEditor.Code/>
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
            <Switch {...form.getInputProps('enabled', {type: 'checkbox'})} key={form.key('enabled')}
                    label="Enabled" onLabel="ON" offLabel="OFF" mt={"md"}/>
            <Button type={"submit"} mt="xl" key={"button"}>Update</Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}
