import {
  Breadcrumbs,
  Button,
  Container,
  FileInput, Group, Image,
  MultiSelect,
  Paper,
  PasswordInput,
  Switch,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import {Link, useNavigate} from 'react-router-dom';
import classes from "@/pages/users/update/UpdateUser.module.css";
import {useState} from 'react';
import {useForm} from '@mantine/form';
import {useCreateUser} from "@/pages/users/create/useCreateUser.ts";
import {AxiosError} from "axios";
import {AxiosErrorResponseDto} from "@/common/axios/AxiosErrorResponseDto.ts";
import {userCreateSchema} from "@/pages/users/create/zod";
import {zodResolver} from "mantine-form-zod-resolver";
import z from "zod";

export const CreateUser = () => {
  const createUserMutation = useCreateUser()
  const errorData = (createUserMutation.error as AxiosError)?.response?.data as AxiosErrorResponseDto // TODO: Use or remove
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    const formData = form.getValues();
    // @ts-expect-error we change data and data type when submitting
    formData['roles'] = [].concat(selectedRoles);
    const response = await createUserMutation.mutateAsync(formData);
    //navigate(`/admin/users/view/${response.data?.id}`);
    // TODO: server validation
    navigate('/admin/users');
  }

  const form = useForm<z.infer<typeof userCreateSchema>>({
    mode: 'uncontrolled',
    validate: zodResolver(userCreateSchema),
    validateInputOnChange: true,
    initialValues: {"enabled": false}
  });

  const items = [
    {title: 'Users', href: '/admin/users'},
    {title: 'Create', href: '#'},
  ].map((item, index) => (
    (item.href !== '#') ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
  ));
  const roles = ['ADMIN', 'MODERATOR', 'USER']
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Container size={420}>
        <Title ta="center" className={classes.title}>
          Create user
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(onSubmitHandler)}>
            <TextInput {...form.getInputProps('firstName')} key={form.key('firstName')}
                       label="First name" placeholder="First name"/>
            <TextInput {...form.getInputProps('lastName')} key={form.key('lastName')}
                       label="Last name" placeholder="Last name"/>
            <TextInput {...form.getInputProps('email')} key={form.key('email')}
                       label="Email" placeholder="me@email.com" required type={"email"}/>
            {/*<FileInput {...form.getInputProps('avatar')} key={form.key('avatar')}*/}
            {/*           accept="image/png,image/jpeg"*/}
            {/*           clearable label="Avatar" placeholder="Upload avatar file"*/}
            {/*           onChange={(query) => {*/}
            {/*             form.setFieldValue('avatar', query)*/}
            {/*           }}*/}
            {/*/>*/}
            <Group grow>
              {/*{user?.avatar && (<Image src={user?.avatar} h={75} w="auto" fit="contain" mt={10}/>)}*/}
              <TextInput {...form.getInputProps('avatar')} key={form.key('avatar')}
                         label="Avatar" placeholder="avatar"/>
            </Group>
            <PasswordInput {...form.getInputProps('password')} key={form.key('password')}
                           label="Password" placeholder="Your password" required/>
            <PasswordInput {...form.getInputProps('confirm')}
                           key={form.key('confirm')}
                           label="Password confirmation" placeholder="Confirm user password" required
            />
            <MultiSelect  {...form.getInputProps('rolesSwitch')} key={form.key('rolesSwitch')}
                          label="Roles"
                          data={roles}
                          clearable searchable placeholder="Pick value"
                          value={selectedRoles}
                          onChange={event => setSelectedRoles(event)}
            />
            <Switch {...form.getInputProps('enabled', {type: 'checkbox'})} key={form.key('enabled')}
                    label="Enabled" onLabel="ON" offLabel="OFF" mt={"md"}
            />
            <Button type={"submit"} fullWidth mt="xl" key={"button"}>Create</Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}
