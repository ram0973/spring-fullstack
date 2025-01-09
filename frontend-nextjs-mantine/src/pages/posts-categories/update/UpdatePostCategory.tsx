import {
  Breadcrumbs,
  Button,
  Container,
  Paper,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import {Link, useNavigate, useParams} from 'react-router-dom';
import classes from "./UpdatePostCategory.module.css";
import {useEffect} from 'react';
import {useForm} from '@mantine/form';
import {AxiosError} from "axios";
import {AxiosErrorResponseDto} from "@/common/axios/AxiosErrorResponseDto.ts";
import {zodResolver} from "mantine-form-zod-resolver";
import z from "zod";
import {useGetPostCategory} from "@/pages/posts-categories/view/useGetPostCategory.ts";
import {postCategoryUpdateSchema} from "@/pages/posts-categories/update/zod.ts";
import {useUpdatePostCategory} from "@/pages/posts-categories/update/useUpdatePostCategory.ts";
import {PostCategory} from "@/pages/posts-categories";

export const UpdatePostCategory = () => {
  const updatePostCategoryMutation = useUpdatePostCategory()
  const errorData = (updatePostCategoryMutation.error as AxiosError)?.response?.data as AxiosErrorResponseDto // TODO: Use or remove
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    const formData = form.getValues();
    const response = await updatePostCategoryMutation.mutateAsync(formData);
    //navigate(`/admin/users/view/${response.data?.id}`);
    // TODO: server validation, handle errors
    console.log(formData);
    navigate('/admin/posts-categories');
  }

  const {id} = useParams();
  const initialData: PostCategory = useGetPostCategory(id).data;
  console.log(initialData);
  const form = useForm<z.infer<typeof postCategoryUpdateSchema>>({
    mode: 'uncontrolled',
    validate: zodResolver(postCategoryUpdateSchema),
    validateInputOnChange: true,
  });

  useEffect(() => {
    form.setValues(initialData);
    form.resetDirty(initialData);
  }, [initialData]);

  const items = [
    {title: 'categories', href: '/admin/posts-categories'},
    {title: 'Update', href: '#'},
  ].map((item, index) => (
    (item.href !== '#') ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
  ));

  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Container size={420}>
        <Title ta="center" className={classes.title}>
          Update category
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(onSubmitHandler)}>
            <TextInput {...form.getInputProps('title')} key={form.key('title')} label="Category" placeholder="Enter category"/>
            <TextInput {...form.getInputProps('slug')} key={form.key('slug')} label="Slug" placeholder="Enter category slug"/>
            <Button type={"submit"} fullWidth mt="xl" key={"button"}>Update</Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}
