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
import Link from "next/link";

export const Header = () => {
  // const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  // const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  // const theme = useMantineTheme();

  return (
    <>
      <a href="#" className={classes.link}>
         Home
      </a>
    </>
  );
}
