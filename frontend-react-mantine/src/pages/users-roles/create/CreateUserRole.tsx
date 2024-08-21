import {Breadcrumbs, Button, Container, Paper, Text, TextInput, Title} from '@mantine/core';
import {Link, useNavigate} from 'react-router-dom';
import classes from "@/pages/users/update/UpdateUser.module.css";
import {useForm} from '@mantine/form';
import {AxiosError} from "axios";
import {AxiosErrorResponseDto} from "@/common/axios/AxiosErrorResponseDto.ts";
import {zodResolver} from "mantine-form-zod-resolver";
import z from "zod";
import {useCreateUserRole} from './useCreateUserRole';
import {userRoleCreateSchema} from './zod';

export const CreateUserRole = () => {
  const createUserRoleMutation = useCreateUserRole()
  const errorData = (createUserRoleMutation.error as AxiosError)?.response?.data as AxiosErrorResponseDto // TODO: Use or remove
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    const formData = form.getValues();
    const response = await createUserRoleMutation.mutateAsync(formData);
    // TODO: server validation
    navigate('/admin/roles');
  }

  const form = useForm<z.infer<typeof userRoleCreateSchema>>({
    mode: 'uncontrolled',
    validate: zodResolver(userRoleCreateSchema),
    validateInputOnChange: true,
    //initialValues: {"enabled": false}
  });

  const items = [
    {title: 'Roles', href: '/admin/roles'},
    {title: 'Create', href: '#'},
  ].map((item, index) => (
    (item.href !== '#') ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
  ));
  const roles = ['ADMIN', 'MODERATOR', 'USER']
  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Container size={420}>
        <Title ta="center" className={classes.title}>
          Create role
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(onSubmitHandler)}>
            <TextInput {...form.getInputProps('role')} key={form.key('role')}
                       label="Role" placeholder="Enter role"/>
            <Button type={"submit"} fullWidth mt="xl" key={"button"}>Create</Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}
