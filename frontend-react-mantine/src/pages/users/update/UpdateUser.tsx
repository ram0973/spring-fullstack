import {Breadcrumbs, Button, Container, Paper, PasswordInput, Switch, TextInput, Title} from '@mantine/core';
import {Link} from 'react-router-dom';
import classes from "@/pages/users/update/UpdateUser.module.css";

export const UpdateUser = () => {
  const items = [
    {title: 'Users', href: '/admin/users'},
    {title: 'Update', href: '#'},
  ].map((item, index) => (
    (item.href !== '#') ? <Link to={item.href}>{item.title}</Link> : item.title
  ));

  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Update user
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="First name" placeholder="First name"/>
          <TextInput label="Last name" placeholder="Last name"/>
          <TextInput label="Email" placeholder="me@email.com" required/>
          <PasswordInput label="Password" placeholder="Your password" />
          <PasswordInput label="Password confirmation" placeholder="Confirm user password" error="" />
          <Switch defaultChecked label="Enabled" onLabel="ON" offLabel="OFF" mt={"md"}/>
          <Button fullWidth mt="xl">Update</Button>
        </Paper>
      </Container>
    </>
  )
}
