import {Breadcrumbs, Button, Container, Paper, Text, TextInput, Title} from '@mantine/core';
import {Link, useNavigate} from 'react-router-dom';
import classes from "@/pages/posts-categories/create/CreatePostCategory.module.css";
import {useForm} from '@mantine/form';
import {AxiosError} from "axios";
import {AxiosErrorResponseDto} from "@/common/axios/AxiosErrorResponseDto.ts";
import {zodResolver} from "mantine-form-zod-resolver";
import z from "zod";
import {useCreatePostCategory} from './useCreatePostCategory.ts';
import {postCategoryCreateSchema} from './zod';

export const CreatePostCategory = () => {
  const createPostCategoryMutation = useCreatePostCategory()
  const errorData = (createPostCategoryMutation.error as AxiosError)?.response?.data as AxiosErrorResponseDto // TODO: Use or remove
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    const formData = form.getValues();
    const response = await createPostCategoryMutation.mutateAsync(formData);
    // TODO: server validation
    navigate('/admin/posts-categories');
  }

  const form = useForm<z.infer<typeof postCategoryCreateSchema>>({
    mode: 'uncontrolled',
    validate: zodResolver(postCategoryCreateSchema),
    validateInputOnChange: true,
    //initialValues: {"enabled": false}
  });

  const items = [
    {title: 'Post categories', href: '/admin/post-categories'},
    {title: 'Create', href: '#'},
  ].map((item, index) => (
    (item.href !== '#') ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
  ));

  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Container size={420}>
        <Title ta="center" className={classes.title}>
          Create post category
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(onSubmitHandler)}>
            <TextInput {...form.getInputProps('title')} key={form.key('title')}
                       label="Title" placeholder="Enter category title"/>
            <TextInput {...form.getInputProps('slug')} key={form.key('slug')}
                       label="Slug" placeholder="Enter category slug"/>
            <Button type={"submit"} fullWidth mt="xl" key={"button"}>Create</Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}
