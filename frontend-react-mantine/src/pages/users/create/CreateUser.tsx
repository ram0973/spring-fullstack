import {Breadcrumbs, Button, Container, Paper, PasswordInput, Switch, TextInput, Title} from '@mantine/core';
import {Link} from 'react-router-dom';
import classes from "@/pages/users/update/UpdateUser.module.css";
import {useState} from 'react';
import {hasLength, isEmail, useForm} from '@mantine/form';

export const CreateUser = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {},
    validate: {
      password: hasLength({min: 3}, 'Must be at least 3 characters'),
      email: isEmail('Invalid email'),
    },
  });

  const [submittedValues, setSubmittedValues] =
    useState<typeof form.values | null>(null);

  const items = [
    {title: 'Users', href: '/admin/users'},
    {title: 'Create', href: '/admin/users/create'},
  ].map((item, index) => (
    (item.href !== '#') ? <Link to={item.href}>{item.title}</Link> : item.title
  ));

  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Create user
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="First name" placeholder="First name"/>
          <TextInput label="Last name" placeholder="Last name"/>
          <TextInput label="Email" placeholder="me@email.com" required/>
          <PasswordInput label="Password" placeholder="Your password" required/>
          <PasswordInput label="Password confirmation" placeholder="Confirm user password" error="" required/>
          <Switch defaultChecked label="Enabled" onLabel="ON" offLabel="OFF" mt={"md"}/>
          <Button fullWidth mt="xl">Create</Button>
        </Paper>
      </Container>
    </>
  )
}
