import {Breadcrumbs, Button, Container, Paper, Switch, Text, TextInput, Title} from '@mantine/core';
import {Link, useNavigate} from 'react-router-dom';
import classes from "@/pages/posts-tags/create/CreatePostTag.module.css";
import {useForm} from '@mantine/form';
import {AxiosError} from "axios";
import {AxiosErrorResponseDto} from "@/common/axios/AxiosErrorResponseDto.ts";
import {zodResolver} from "mantine-form-zod-resolver";
import z from "zod";
import {useCreatePostTag} from "@/pages/posts-tags/create/useCreatePostTag.ts";
import {postTagCreateSchema} from "@/pages/posts-tags/create/zod.ts";

export const CreatePostTag = () => {
  const createPostTagMutation = useCreatePostTag();
  const errorData = (createPostTagMutation.error as AxiosError)?.response?.data as AxiosErrorResponseDto; // TODO: Use or remove
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    const formData = form.getValues();
    // @ts-expect-error we change data and data type when submitting
    const response = await createPostTagMutation.mutateAsync(formData);
    //navigate(`/admin/posts/view/${response.data?.id}`);
    // TODO: server validation
    navigate('/admin/posts-tags');
  }

  const form = useForm<z.infer<typeof postTagCreateSchema>>({
    mode: 'uncontrolled',
    validate: zodResolver(postTagCreateSchema),
    validateInputOnChange: true,
    initialValues: {"enabled": true}
  });

  const items = [
    {title: 'Post tags', href: '/admin/posts-tags'},
    {title: 'Create', href: '#'},
  ].map((item, index) => (
    (item.href !== '#') ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
  ));

  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Container size={420}>
        <Title ta="center" className={classes.title}>
          Create post tag
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(onSubmitHandler)}>
            <TextInput {...form.getInputProps('title')} key={form.key('title')}
                       label="Tag" placeholder="Tag" required/>
            <TextInput {...form.getInputProps('slug')} key={form.key('slug')}
                       label="Slug" placeholder="slug" required/>
            <Switch {...form.getInputProps('enabled', {type: 'checkbox'})} key={form.key('enabled')}
                    label="Enabled" onLabel="ON" offLabel="OFF" mt={"md"}/>
            <Button type={"submit"} fullWidth mt="xl" key={"button"}>Create</Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}
