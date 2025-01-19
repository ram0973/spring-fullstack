import {
  Avatar,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  rem,
  ScrollArea,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {IconChevronDown,} from '@tabler/icons-react';
import classes from './Header.module.css';
import {Link, useLocation} from "react-router-dom";
import {useContext} from "react";
import {authContext} from "@/common/context/AuthContext.tsx";
import {useLogout} from "@/pages/auth/logout/useLogout.ts"
import {router} from "@/router.tsx";

export const Header = () => {
  const context = useContext(authContext);
  const [drawerOpened, {toggle: toggleDrawer, close: closeDrawer}] = useDisclosure(false);
  const [linksOpened, {toggle: toggleLinks}] = useDisclosure(false);
  const theme = useMantineTheme();
  const logoutMutation = useLogout();
  const location = useLocation();
  const onLogoutHandler = async () => {
    const response = await logoutMutation.mutateAsync();
    if (response?.status == 204) {
       context?.logout();
       router.navigate("/").then();
    }
  }

  return (
    <>
      <Drawer
        position="left"
        offset={"0"}
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm"/>

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown
                style={{width: rem(16), height: rem(16)}}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}></Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>
          <Divider my="sm"/>
          <Group justify="center" grow pb="xl" px="md">
            {context?.user ?
              <Link to={"/login"}>Log in</Link> :
              <Button onClick={() => useLogout()}
              >Log out</Button>}
            {context?.user ? "" : <Link to={"/signup"}>Sign up</Link>}
          </Group>
        </ScrollArea>
      </Drawer>
      <Box>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <Group h="100%" gap={0} visibleFrom="sm">
              <Link to="/" className={classes.link}>
                Home
              </Link>
            </Group>

            <Group visibleFrom="sm">
              {context?.user?.email ? <Avatar src={context?.user?.avatar} alt="User's avatar"/> : ""}
              <Link to={"/admin/users"}><Button variant="default">Admin</Button></Link>
              {context?.user?.email ? "" : <Link to={"/login"}><Button>Log in</Button></Link>}
              {context?.user?.email ? <Button onClick={onLogoutHandler}>Log out</Button> : ""}
              {context?.user?.email ? "" : <Link to={"/signup"}><Button>Sign up</Button></Link>}
            </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm"/>
          </Group>
        </header>
      </Box>
    </>
  );
}
