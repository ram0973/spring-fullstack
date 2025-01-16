import {
  Breadcrumbs,
  Button,
  Container,
  FileInput,
  Group,
  Image,
  Input,
  Paper,
  Switch,
  Text,
  Textarea,
  TextInput,
  Title
} from '@mantine/core';
import {Link, useNavigate, useParams} from 'react-router-dom';
import classes from "@/pages/posts/update/UpdatePost.module.css";
import React, {useEffect} from 'react';
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
import {notifications} from "@mantine/notifications";
import {
  headingsPlugin,
  listsPlugin,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
  thematicBreakPlugin
} from "@mdxeditor/editor";

export const UpdatePost = () => {
  //const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const updatePostMutation = useUpdatePost();
  // TODO: Use or remove
  const errorData = (updatePostMutation.error as AxiosError)?.response?.data as AxiosErrorResponseDto;

  const navigate = useNavigate();

  const {id} = useParams();
  //TODO: use await? here
  const post: Post = useGetPost(id).data;
  const editorRef = React.useRef<MDXEditorMethods>(null);
  //const tags = useGetTags().data?.postTags.map(item => item.title);
  //const categories = useGetCategories().data?.postCategories.map(item => item.title);

  const onSubmitHandler = async () => {
    // TODO: is prevent default here?

    //form.setFieldValue("content", editorRef);
    const formData = form.getValues();
    // TODO: convert to DTO
    // @ts-ignore
    //formData['tags'] = ([].concat(selectedTags)).toString();

    formData['content'] = editorRef?.current?.getMarkdown();

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
    navigate('/admin/posts/');
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
    if (post) {
      form.setValues(post);
      form.setFieldValue('image', null);
      editorRef.current?.setMarkdown(post.content); // Обновляем состояние содержимого редактора
      form.resetDirty(post);
    }
    //form.setFieldValue('category', post?.category?.title);
    //setSelectedTags(post?.tags);
    //form.setFieldValue('content', post?.content)
    //editorRef?.current?.setMarkdown(post?.content)
    //form.resetDirty(post);
  }, [post]);//n dev, tags, categories]);

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
            {/*<Select {...form.getInputProps('category')} key={form.key('category')}*/}
            {/*        label="Category"*/}
            {/*        placeholder="Pick value"*/}
            {/*        data={categories}/>*/}
            <Group grow>
              {post?.image && (<Image src={post?.image} h={75} w="auto" fit="contain" mt={10}/>)}
              <TextInput {...form.getInputProps('image')} key={form.key('image')}
                         label="Image" placeholder="Image"/>
              {/*<FileInput {...form.getInputProps('image')} key={form.key('image')}*/}
              {/*           accept="image/png,image/jpeg,image/webp"*/}
              {/*           clearable label="Post image" placeholder="Upload post image file"/>*/}
            </Group>
            <Textarea {...form.getInputProps('excerpt')} key={form.key('excerpt')}
                      autosize resize="vertical" minRows={2} label="Post excerpt" placeholder="Post excerpt"/>
            <Input.Wrapper withAsterisk label="Post content">
              <MDXEditor ref={editorRef}
                         markdown={post?.content ?? ""} // Используем состояние для содержимого
                         //onChange={setEditorContent}
                         plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), thematicBreakPlugin()]}/>
            </Input.Wrapper>
            {/*<TagsInput*/}
            {/*  label="Post tags"*/}
            {/*  placeholder="Pick value or enter anything"*/}
            {/*  data={tags}*/}
            {/*  comboboxProps={{position: 'top', middlewares: {flip: false, shift: false}}}*/}
            {/*  value={selectedTags}*/}
            {/*  onChange={event => setSelectedTags(event)}/>*/}
            <Switch {...form.getInputProps('enabled', {type: 'checkbox'})} key={form.key('enabled')}
                    label="Enabled" onLabel="ON" offLabel="OFF" mt={"md"}/>
            <Button type={"submit"} mt="xl" key={"button"}>Update</Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}
