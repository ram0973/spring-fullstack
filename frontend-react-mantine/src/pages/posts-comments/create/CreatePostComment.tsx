import {Breadcrumbs, Button, Container, Input, Paper, Switch, Text, Title} from '@mantine/core';
import {Link, useNavigate} from 'react-router-dom';
import classes from "@/pages/posts-comments/create/CreatePostComment.module.css";
import {useForm} from '@mantine/form';
import {AxiosError} from "axios";
import {AxiosErrorResponseDto} from "@/common/axios/AxiosErrorResponseDto.ts";
import {zodResolver} from "mantine-form-zod-resolver";
import z from "zod";
import {postCommentCreateSchema} from "@/pages/posts-comments/create/zod.ts";
import {RichTextEditor} from "@mantine/tiptap";
import {createLowlight} from "lowlight";
import {useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {Underline} from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import {useCreatePostComment} from "@/pages/posts-comments/create/useCreatePostComment.ts";
import ts from "highlight.js/lib/languages/typescript";


export const CreatePostComment = () => {
  const createPostCommentMutation = useCreatePostComment();
  // TODO: Use or remove
  const errorData = (createPostCommentMutation.error as AxiosError)?.response?.data as AxiosErrorResponseDto;
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    const formData = form.getValues();
    // @ts-expect-error we change data and data type when submitting

    const response = await createPostCommentMutation.mutateAsync(formData);
    //navigate(`/admin/posts/view/${response.data?.id}`);
    // TODO: server validation
    navigate('/admin/posts-comments');
  }

  const form = useForm<z.infer<typeof postCommentCreateSchema>>({
    mode: 'uncontrolled',
    validate: zodResolver(postCommentCreateSchema),
    validateInputOnChange: true,
    initialValues: {"enabled": true}
  });

  const lowlight = createLowlight();
  lowlight.register({ts});

  const editor = useEditor({
    extensions: [
      StarterKit.configure({codeBlock: false}),
      Underline,
      //Link, // TODO: import link with full names
      TextAlign.configure({types: ['heading', 'paragraph']}),
      CodeBlockLowlight.configure({lowlight}),
    ],
    content: "",
  });

  const breadcrumbs = [
    {title: 'Post comments', href: '/admin/posts-comments'},
    {title: 'Create', href: '#'},
  ].map((item, index) => (
    (item.href !== '#') ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
  ));

  return (
    <>
      <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
      <Container size={420}>
        <Title ta="center" className={classes.title}>
          Create post comment
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(onSubmitHandler)}>
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
            <Switch {...form.getInputProps('enabled', {type: 'checkbox'})} key={form.key('enabled')}
                    label="Enabled" onLabel="ON" offLabel="OFF" mt={"md"}/>
            <Button type={"submit"} fullWidth mt="xl" key={"button"}>Create</Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}
