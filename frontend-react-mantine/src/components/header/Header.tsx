import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme, Avatar,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronDown,
} from '@tabler/icons-react';
import classes from './Header.module.css';
import {Link} from "react-router-dom";

export const Header = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

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
        <Divider my="sm" />

        <a href="#" className={classes.link}>
          Home
        </a>
        <UnstyledButton className={classes.link} onClick={toggleLinks}>
          <Center inline>
            <Box component="span" mr={5}>
              Features
            </Box>
            <IconChevronDown
              style={{ width: rem(16), height: rem(16) }}
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
        <Divider my="sm" />
        <Group justify="center" grow pb="xl" px="md">
          <Link to={"/login"}>Log in</Link>
          <Link to={"/signup"}>Sign up</Link>
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
            <Avatar src="avatar.png" alt="it's me"/>
            <Link to={"/admin/users"}><Button variant="default">Admin</Button></Link>
            <Link to={"/login"}><Button variant="default">Log in</Button></Link>
            <Link to={"/signup"}><Button>Sign up</Button></Link>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>
    </Box>
    </>
  );
}
