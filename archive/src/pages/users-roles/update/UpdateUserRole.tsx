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
import classes from "./UpdateUserRole.module.css";
import {useEffect} from 'react';
import {useForm} from '@mantine/form';
import {AxiosError} from "axios";
import {AxiosErrorResponseDto} from "@/common/axios/AxiosErrorResponseDto.ts";
import {zodResolver} from "mantine-form-zod-resolver";
import z from "zod";
import {UserRole} from "@/pages/users-roles";
import {useUpdateUserRole} from "@/pages/users-roles/update/useUpdateUserRole.ts";
import {useGetUserRole} from "@/pages/users-roles/view/useGetUserRole.ts";
import {userRoleUpdateSchema} from "@/pages/users-roles/update/zod.ts";

export const UpdateUserRole = () => {
  const updateUserRoleMutation = useUpdateUserRole()
  const errorData = (updateUserRoleMutation.error as AxiosError)?.response?.data as AxiosErrorResponseDto // TODO: Use or remove
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    const formData = form.getValues();
    const response = await updateUserRoleMutation.mutateAsync(formData);
    //navigate(`/admin/users/view/${response.data?.id}`);
    // TODO: server validation, handle errors
    console.log(formData);
    navigate('/admin/roles');
  }

  const {id} = useParams();
  const initialData: UserRole = useGetUserRole(id).data;
  console.log(initialData);
  const form = useForm<z.infer<typeof userRoleUpdateSchema>>({
    mode: 'uncontrolled',
    validate: zodResolver(userRoleUpdateSchema),
    validateInputOnChange: true,
  });

  useEffect(() => {
    form.setValues(initialData);
    form.resetDirty(initialData);
  }, [initialData]);

  const items = [
    {title: 'Roles', href: '/admin/roles'},
    {title: 'Update', href: '#'},
  ].map((item, index) => (
    (item.href !== '#') ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
  ));
  const roles = ['ADMIN', 'MODERATOR', 'USER']
  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Container size={420}>
        <Title ta="center" className={classes.title}>
          Update role
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(onSubmitHandler)}>
            <TextInput {...form.getInputProps('role')} key={form.key('role')}
                       label="Role" placeholder="Enter role"/>
            <Button type={"submit"} fullWidth mt="xl" key={"button"}>Update</Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}
