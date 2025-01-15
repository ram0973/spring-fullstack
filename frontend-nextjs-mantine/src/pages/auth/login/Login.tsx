import {Anchor, Button, Container, Group, Paper, PasswordInput, Switch, Text, TextInput, Title} from '@mantine/core';
import classes from './Login.module.css';
import {Link} from 'react-router-dom';
import {useForm} from "@mantine/form";
import z from "zod";
import {zodResolver} from "mantine-form-zod-resolver";
import {loginSchema} from "@/pages/auth/login/zod.ts";
import {useLogin} from "@/pages/auth/login/useLogin.ts";
import {authContext} from "@/common/context/AuthContext.tsx";
import {User} from "@/pages/users";
import {useContext} from "react";

export function Login() {
  const loginMutation = useLogin();
  const form = useForm<z.infer<typeof loginSchema>>({
    mode: 'uncontrolled',
    validate: zodResolver(loginSchema),
    validateInputOnChange: true,
  });
  const context = useContext(authContext);

  const onSubmitHandler = async () => {
    const formData = form.getValues();
    const response = await loginMutation.mutateAsync(formData);
    console.log(response);
    if (response.status == 200) {
      context?.login(response.data as User)
    }
    console.log(context)
    //navigate(`/admin/users/view/${response.data?.id}`);
    // TODO: server validation
  }

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
        <form onSubmit={form.onSubmit(onSubmitHandler)}>
          <TextInput {...form.getInputProps('email')} key={form.key('email')}
                     label="Email" placeholder="me@email.com" required/>
          <PasswordInput {...form.getInputProps('password')} key={form.key('password')}
                         label="Password" placeholder="Your password" required mt="md"/>
          <Group justify="space-between" mt="lg">
            <Switch {...form.getInputProps('rememberMe')} key={form.key('rememberMe')}
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
          <Button type={"submit"} fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
