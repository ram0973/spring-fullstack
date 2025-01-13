import {Breadcrumbs, Button, Container, Input, Paper, Switch, Text, Title} from '@mantine/core';
import {Link, useNavigate, useParams} from 'react-router-dom';
import classes from "@/pages/posts-comments/update/UpdatePostComment.module.css";
import {useEffect} from 'react';
import {useForm} from '@mantine/form';
import {AxiosError} from "axios";
import {AxiosErrorResponseDto} from "@/common/axios/AxiosErrorResponseDto.ts";
import {zodResolver} from "mantine-form-zod-resolver";
import z from "zod";
import {useUpdatePostComment} from "@/pages/posts-comments/update/useUpdatePostComment.ts";
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
import {notifications} from "@mantine/notifications";
import {useGetPostComment} from "@/pages/posts-comments/view/useGetPostComment.ts";
import {PostComment} from "@/pages/posts-comments";
import {postCommentUpdateSchema} from "@/pages/posts-comments/update/zod.ts";

export const UpdatePostComment = () => {
  const updatePostCommentMutation = useUpdatePostComment();
  // TODO: Use or remove
  const errorData = (updatePostCommentMutation.error as AxiosError)?.response?.data as AxiosErrorResponseDto
  const navigate = useNavigate();

  const lowlight = createLowlight();
  lowlight.register({ts});

  const {id} = useParams();

  const comment: PostComment = useGetPostComment(id).data;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({codeBlock: false}),
      Underline,
      //Link, // TODO: import link with full names
      TextAlign.configure({types: ['heading', 'paragraph']}),
      CodeBlockLowlight.configure({lowlight}),
    ],
    content: comment?.content,
  });

  const onSubmitHandler = async () => {
    //event.preventDefault();

    form.setFieldValue("content", editor.getHTML());
    const formData = form.getValues();
    // TODO: convert to DTO
    // @ts-ignore
    //formData['tags'] = ([].concat(selectedTags)).toString();

    //formData['content'] = content;

    const response = updatePostCommentMutation.mutateAsync(formData)
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
    navigate('/admin/posts-comments');
  }

  const form = useForm<z.infer<typeof postCommentUpdateSchema>>( //createFormContext<z.infer<typeof postUpdateSchema>>();
    {
      mode: 'uncontrolled',
      validate: zodResolver(postCommentUpdateSchema),
      validateInputOnChange: true,
      //initialValues: {"enabled": false}
    }
  );

  useEffect(() => {
    form.setValues(comment);
    editor?.commands?.setContent(comment?.content);
    form.resetDirty(comment);
  }, [comment]);

  const items = [
    {title: 'Comments', href: '/admin/posts-comments'},
    {title: 'Update', href: '#'},
  ].map((item, index) => (
    (item.href !== '#') ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
  ));

  //const [content, setContent] = useState<string>("");

  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Container size={830}>
        <Title ta="center" className={classes.title}>
          Update comment
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={onSubmitHandler}>
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
            <Button type={"submit"} mt="xl" key={"button"}>Update</Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}
