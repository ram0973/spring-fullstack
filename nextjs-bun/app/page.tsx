'use client';
import {IconMoon, IconSun} from '@tabler/icons-react';
import cx from 'clsx';
import {ActionIcon, AppShell, Burger, useComputedColorScheme, useMantineColorScheme} from "@mantine/core";
import styles from "./page.module.css";
import {useDisclosure} from "@mantine/hooks";

export default function Home() {
  const {setColorScheme} = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {getInitialValueInEffect: true});
  const [opened, {toggle}] = useDisclosure();

  return (
    <AppShell className={styles.page}
              header={{height: 60}}
              navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: {mobile: !opened},
              }}
              padding="md"
    >
      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <div>Logo</div>
        <ActionIcon
          onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
          variant="default"
          size="xl"
          aria-label="Toggle color scheme"
        >
          <IconSun className={cx(styles.icon, styles.light)} stroke={1.5}/>
          <IconMoon className={cx(styles.icon, styles.dark)} stroke={1.5}/>
        </ActionIcon>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main className={styles.main}>Main</AppShell.Main>
    </AppShell>
  );
}
