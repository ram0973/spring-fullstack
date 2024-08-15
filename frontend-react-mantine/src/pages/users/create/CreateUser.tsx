import {
  Breadcrumbs,
  Button,
  Container,
  FileInput,
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
  const errorData = (createUserMutation.error as AxiosError)?.response?.data as AxiosErrorResponseDto
  const navigate = useNavigate();

  const onSubmitHandler = async (formData) => {
    console.log(formData);
    const response = await createUserMutation.mutateAsync(formData);
    //navigate(`/admin/users/view/${response.data?.id}`);
  }

  const form = useForm<z.infer<typeof userCreateSchema>>({
    mode: 'uncontrolled',
    validate: zodResolver(userCreateSchema),
    validateInputOnChange: true,
    initialValues: {"enabled": true, "roles": []}
  });

  const [submittedValues, setSubmittedValues] =
    useState<typeof form.values | null>(null);

  const items = [
    {title: 'Users', href: '/admin/users'},
    {title: 'Create', href: '#'},
  ].map((item, index) => (
    (item.href !== '#') ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
  ));
  const [checked, setChecked] = useState(false);
  const roles =
    [{value: 'ADMIN', label: 'Admin'}, {value: 'MODERATOR', label: 'Moderator'}, {value: 'USER', label: 'User'}]
  const [selectedRoles, setSelectedRoles] = useState([]);
  const rolesChanged = (val: any) => {
    setSelectedRoles(val);
    form.setFieldValue('roles', selectedRoles);
  }
  const [value, setValue] = useState<string[]>([]);
  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Container size={420} my={40}>
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
            <FileInput {...form.getInputProps('avatar')} key={form.key('avatar')}
                       accept="image/png,image/jpeg"
                       clearable label="Avatar" placeholder="Upload avatar file"
                       onChange={(query) => {
                         form.setFieldValue('avatar', query)
                       }}
            />
            <PasswordInput {...form.getInputProps('password')} key={form.key('password')}
                           label="Password" placeholder="Your password" required/>
            <PasswordInput {...form.getInputProps('confirm')}
                           key={form.key('confirm')}
                           label="Password confirmation" placeholder="Confirm user password" required
            />
            <MultiSelect  {...form.getInputProps('roles')} key={form.key('roles')}
                          label="Roles"
                          data={["ADMIN", "MODERATOR", "USER"]} value={value}
                          defaultValue={['USER']} clearable searchable placeholder="Pick value"
                          onChange={(query) => {
                            setValue(query);
                            form.setFieldValue('roles', value)
                          }}

            />

            {/*<MultiSelect {...form.getInputProps('roles')} key={form.key('roles')}*/}
            {/*             label="Roles" placeholder="Pick value" data={roles} clearable //value={selectedRoles}*/}
            {/*             // onChange={(event) => {*/}
            {/*             //*/}
            {/*             //   form.setFieldValue('roles', selectedRoles);*/}
            {/*             // }}*/}
            {/*/>*/}
            <Switch {...form.getInputProps('enabled')} key={form.key('enabled')}
                    label="Enabled" onLabel="ON" offLabel="OFF" mt={"md"}
                    defaultChecked
              //value={checked ? 'true' : 'false'}
              //onChange={(event) => setChecked(event.currentTarget.checked)}
              // onChange={(event) => {
              //   setChecked(event.currentTarget.checked);
              // //    form.setFieldValue('enabled', event.currentTarget.checked);
              // }}
            />
            <Button type={"submit"} fullWidth mt="xl" key={"button"}>Create</Button>
          </form>
        </Paper>
      </Container>
    </>
  )
}
