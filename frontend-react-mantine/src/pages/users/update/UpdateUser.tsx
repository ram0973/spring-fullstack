import {Button, Container, Paper, Switch, TextInput, Title} from '@mantine/core';
import classes from './UpdateUser.module.css';


export const UpdateUser = () => {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Update user
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="First name" placeholder="First name"/>
        <TextInput label="Last name" placeholder="Last name"/>
        <TextInput label="Email" placeholder="me@email.com" required/>
        <Switch defaultChecked label="Enabled" onLabel="ON" offLabel="OFF" mt={20} />
        <Button fullWidth mt="xl">Update</Button>
      </Paper>
    </Container>
  );
}
