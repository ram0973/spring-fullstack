import {Breadcrumbs, Button, Fieldset, PasswordInput, Stack, Switch, TextInput} from '@mantine/core';
import {IconAt} from '@tabler/icons-react';
import {Link} from 'react-router-dom';

export const CreateUser = () => {
  const items = [
    {title: 'Users', href: '/admin/users'},
    {title: 'Create', href: '/admin/users/create'},
  ].map((item, index) => (
    <Link to={item.href}>{item.title}</Link>
  ));
  return (<>
      <Breadcrumbs separator="→" separatorMargin="md" mt="xs" mb={"xl"}>{items}</Breadcrumbs>
      <Fieldset legend="Create user">
        <Stack ml={"xl"} mr={"xl"}>
          <TextInput
            mt="md"
            label="User name"
            placeholder="Enter user name"
            error="Error"
          />
          <TextInput label="Email" placeholder="User email" leftSection={<IconAt size={16} error="Input error"/>}/>
          <PasswordInput
            label="Password"
            description="password desc"
            placeholder="Enter user password"
            error=""
          />
          <PasswordInput
            label="Password confirmation"
            //description="password confirm desc"
            placeholder="Confirm user password"
            error=""
          />
          <Switch
            defaultChecked
            label="Enabled"
            mt={"md"}
          />
          <Button variant="filled" mt={"md"}>Create</Button>
        </Stack>
      </Fieldset>
    </>
  )
}
