import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Switch,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import classes from './Login.module.css';
import {Link} from 'react-router-dom';


export function Login() {

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Link to={"/signup"}>
            Create account
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="me@email.com" required/>
        <PasswordInput label="Password" placeholder="Your password" required mt="md"/>
        <Group justify="space-between" mt="lg">
          <Switch
          defaultChecked
          label="Remember me"
          onLabel="ON" offLabel="OFF"
          />
          <Link to={"/forgot-password"}>
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Link>
        </Group>
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
