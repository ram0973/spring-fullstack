import {Breadcrumbs, Button, Container, Paper, Switch, Text, TextInput, Title} from '@mantine/core';
import {Link, useNavigate, useParams} from 'react-router-dom';
import classes from "@/pages/posts-tags/update/UpdatePostTag.module.css";
import {useEffect} from 'react';
import {useForm} from '@mantine/form';
import {AxiosError} from "axios";
import {AxiosErrorResponseDto} from "@/common/axios/AxiosErrorResponseDto.ts";
import {zodResolver} from "mantine-form-zod-resolver";
import z from "zod";
import {postTagUpdateSchema} from "@/pages/posts-tags/update/zod.ts";
import {useGetPostTag} from "@/pages/posts-tags/view/useGetPostTag.ts";
import '@mantine/code-highlight/styles.css';
import '@mantine/tiptap/styles.css';
import {notifications} from "@mantine/notifications";
import {useUpdatePostTag} from "@/pages/posts-tags/update/useUpdatePostTag.ts";
import {PostTag} from "@/pages/posts-tags";

export const UpdatePostTag = () => {
  const updatePostTagMutation = useUpdatePostTag()
  const errorData = (updatePostTagMutation.error as AxiosError)?.response?.data as AxiosErrorResponseDto // TODO: Use or remove
  const navigate = useNavigate();

  const {id} = useParams();
  const tag: PostTag = useGetPostTag(id).data;

  const onSubmitHandler = async () => {
    const formData = form.getValues();
    // TODO: convert to DTO

    console.log(formData);
    const response = updatePostTagMutation.mutateAsync(formData)
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
    //navigate(`/admin/posts-tags/view/${response.data?.id}`);
    // TODO: server validation, handle errors
    console.log(formData);
    navigate('/admin/posts-tags');
  }

  const form = useForm<z.infer<typeof postTagUpdateSchema>>( //createFormContext<z.infer<typeof postUpdateSchema>>();
    {
      mode: 'uncontrolled',
      validate: zodResolver(postTagUpdateSchema),
      validateInputOnChange: true,
      //initialValues: {"enabled": false}
    }
  );

  useEffect(() => {
    form.setValues(tag);
    form.resetDirty(tag);
  }, [tag]);

  const items = [
    {title: 'Posts tags', href: '/admin/posts-tags'},
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
          Update post tag
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={onSubmitHandler}>
            <TextInput {...form.getInputProps('title')} key={form.key('title')}
                       label="Title" placeholder="Title"/>
            <TextInput {...form.getInputProps('slug')} key={form.key('slug')}
                       label="Slug" placeholder="Slug"/>
            <Switch {...form.getInputProps('enabled', {type: 'checkbox'})} key={form.key('enabled')}
                    label="Enabled" onLabel="ON" offLabel="OFF" mt={"md"}/>
            <Button type={"submit"} mt="xl" key={"button"}>Update</Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}
