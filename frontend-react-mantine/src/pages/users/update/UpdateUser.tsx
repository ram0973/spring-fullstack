import {
  Breadcrumbs,
  Button,
  Container,
  FileInput,
  Group,
  Image,
  MultiSelect,
  Paper,
  PasswordInput,
  Switch,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import {Link, useNavigate, useParams} from 'react-router-dom';
import classes from "@/pages/users/update/UpdateUser.module.css";
import {useEffect, useState} from 'react';
import {useForm} from '@mantine/form';
import {AxiosError} from "axios";
import {AxiosErrorResponseDto} from "@/common/axios/AxiosErrorResponseDto.ts";
import {zodResolver} from "mantine-form-zod-resolver";
import z from "zod";
import {useUpdateUser} from "@/pages/users/update/useUpdateUser.ts";
import {userUpdateSchema} from "@/pages/users/update/zod.ts";
import {useGetUser} from "@/pages/users/view/useGetUser.ts";
import {User} from "@/pages/users";

export const UpdateUser = () => {
  const createUserMutation = useUpdateUser()
  const errorData = (createUserMutation.error as AxiosError)?.response?.data as AxiosErrorResponseDto // TODO: Use or remove
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    const formData = form.getValues();
    // @ts-ignore
    formData['roles'] = ([].concat(selectedRoles)).toString();
    const response = await createUserMutation.mutateAsync(formData);
    //navigate(`/admin/users/view/${response.data?.id}`);
    // TODO: server validation
    console.log(formData);
    navigate('/admin/users');
  }

  const {id} = useParams();
  const initialData: User = useGetUser(id).data;

  const form = useForm<z.infer<typeof userUpdateSchema>>({
    mode: 'uncontrolled',
    validate: zodResolver(userUpdateSchema),
    validateInputOnChange: true,
    initialValues: {"enabled": false, "rolesSwitch": []}
  });

  useEffect(() => {
    form.setValues(initialData);
    //if (user?.roles) {
    setSelectedRoles(initialData?.roles);
    //}
    form.resetDirty(initialData);
  }, [initialData]);

  const items = [
    {title: 'Users', href: '/admin/users'},
    {title: 'Update', href: '#'},
  ].map((item, index) => (
    (item.href !== '#') ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
  ));
  const roles = ['ADMIN', 'MODERATOR', 'USER']
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Update user
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(onSubmitHandler)}>
            <TextInput {...form.getInputProps('firstName')} key={form.key('firstName')}
                       label="First name" placeholder="First name"/>
            <TextInput {...form.getInputProps('lastName')} key={form.key('lastName')}
                       label="Last name" placeholder="Last name"/>
            <TextInput {...form.getInputProps('email')} key={form.key('email')}
                       label="Email" placeholder="me@email.com" required type={"email"}/>
            <Group grow>
              {initialData?.avatar && (<Image src={initialData?.avatar} h={75} w="auto" fit="contain" mt={10} />)}
              <FileInput {...form.getInputProps('avatar')} key={form.key('avatar')}
                         accept="image/png,image/jpeg"
                         clearable label="Avatar" placeholder="Upload avatar file"
              />
            </Group>
            <PasswordInput {...form.getInputProps('password')} key={form.key('password')}
                           label="Password" placeholder="Your password"/>
            <PasswordInput {...form.getInputProps('confirm')}
                           key={form.key('confirm')}
                           label="Password confirmation" placeholder="Confirm user password"
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
            <Button type={"submit"} fullWidth mt="xl" key={"button"}>Update</Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}
