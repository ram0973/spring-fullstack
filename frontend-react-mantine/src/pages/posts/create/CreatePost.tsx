import {Breadcrumbs, Button, Container, FileInput, Paper, Switch, Text, TextInput, Title} from '@mantine/core';
import {Link, useNavigate} from 'react-router-dom';
import classes from "@/pages/posts/create/CreatePost.module.css";
import {useForm} from '@mantine/form';
import {useCreatePost} from "@/pages/posts/create/useCreatePost.ts";
import {AxiosError} from "axios";
import {AxiosErrorResponseDto} from "@/common/axios/AxiosErrorResponseDto.ts";
import {postCreateSchema} from "@/pages/posts/create/zod";
import {zodResolver} from "mantine-form-zod-resolver";
import z from "zod";


export const CreatePost = () => {
  const createPostMutation = useCreatePost();
  const errorData = (createPostMutation.error as AxiosError)?.response?.data as AxiosErrorResponseDto; // TODO: Use or remove
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    const formData = form.getValues();
    // @ts-expect-error we change data and data type when submitting
    formData['tags'] = ([].concat(selectedTags)).toString();
    const response = await createPostMutation.mutateAsync(formData);
    //navigate(`/admin/posts/view/${response.data?.id}`);
    // TODO: server validation
    navigate('/admin/posts');
  }

  const form = useForm<z.infer<typeof postCreateSchema>>({
    mode: 'uncontrolled',
    validate: zodResolver(postCreateSchema),
    validateInputOnChange: true,
    initialValues: {"enabled": true}
  });

  const items = [
    {title: 'Posts', href: '/admin/posts'},
    {title: 'Create', href: '#'},
  ].map((item, index) => (
    (item.href !== '#') ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
  ));

  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Container size={420}>
        <Title ta="center" className={classes.title}>
          Create post
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(onSubmitHandler)}>
            <TextInput {...form.getInputProps('firstName')} key={form.key('firstName')}
                       label="First name" placeholder="First name"/>
            <TextInput {...form.getInputProps('email')} key={form.key('email')}
                       label="Email" placeholder="me@email.com" required type={"email"}/>
            <FileInput {...form.getInputProps('avatar')} key={form.key('avatar')}
                       accept="image/png,image/jpeg"
                       clearable label="Avatar" placeholder="Upload avatar file"
                       onChange={(query) => {
                         form.setFieldValue('avatar', query)
                       }}/>
            <Switch {...form.getInputProps('enabled', {type: 'checkbox'})} key={form.key('enabled')}
                    label="Enabled" onLabel="ON" offLabel="OFF" mt={"md"}/>
            <Button type={"submit"} fullWidth mt="xl" key={"button"}>Create</Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}
