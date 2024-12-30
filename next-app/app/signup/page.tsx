import {Anchor, Button, Checkbox, Container, Group, Paper, PasswordInput, Text, TextInput, Title,} from '@mantine/core';
import classes from '../login/Login.module.css';
import Link from 'next/link';

export default function page() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Sign up!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do you have an account?{' '}
        <Link href={"/login"}>
          Log in
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="me@email.com" required/>
        <PasswordInput label="Password" placeholder="Your password" required mt="md"/>
        <PasswordInput
          label="Password confirmation"
          //description="password confirm desc"
          placeholder="Confirm user password"
          error=""
          mt="md"
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me"/>
          <Link href={"/forgot-password"}>
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
