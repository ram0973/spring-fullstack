import {Anchor, Button, Checkbox, Container, Group, Paper, PasswordInput, Text, TextInput, Title,} from '@mantine/core';
import classes from '../login/Login.module.css';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useForm} from "@mantine/form";
import z from "zod";
import {zodResolver} from "mantine-form-zod-resolver";
import {useContext, useState} from "react";
import {authContext} from "@/common/context/AuthContext.tsx";
import {useSignup} from "@/pages/auth/signup/useSignup.ts";
import {signupSchema} from "@/pages/auth/signup/zod.ts";

const signupMutation = useSignup();
const form = useForm<z.infer<typeof signupSchema>>({
  mode: 'uncontrolled',
  validate: zodResolver(signupSchema),
  validateInputOnChange: true,
});
//const context = useContext(authContext);
const location = useLocation();
const navigate = useNavigate();
//const [checked, setChecked] = useState(true);

const onSubmitHandler = async () => {
  const formData = form.getValues();
  //formData['rememberMe'] = checked;
  const response = await signupMutation.mutateAsync(formData);
  if (response.status == 200) {
    //context?.login(response.data as User);
    console.log("signup form submitted")
    const from = location?.state?.from || '/';
    navigate(from, {replace: true});
  }
  // if (response.status == 200) {
  //   context?.login(response.data as User)
  //   if (context?.isRedirected) {
  //     navigate("/")
  //     // context.clearRedirect();
  //     // navigate(-1);
  //   } else {
  //     navigate("/")
  //   }
  // }
  //navigate(`/admin/users/view/${response.data?.id}`);
  // TODO: server validation
}

export const Signup = () => {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Sign up!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do you have an account?{' '}
        <Link to={"/login"}>
          Log in
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(onSubmitHandler)}>
          <TextInput {...form.getInputProps('email')} key={form.key('email')}
                     label="Email" placeholder="me@email.com" required/>
          <PasswordInput {...form.getInputProps('password')} key={form.key('password')}
                         label="Password" placeholder="Your password" required mt="md"/>
          <PasswordInput
            label="Password confirmation"
            //description="password confirm desc"
            placeholder="Confirm user password"
            error=""
            mt="md"
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me"/>
            <Link to={"/forgot-password"}>
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Link>
          </Group>
          <Button type={"submit"} fullWidth mt="xl">
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
