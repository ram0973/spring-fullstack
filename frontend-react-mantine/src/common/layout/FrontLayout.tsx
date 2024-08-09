import {Outlet} from "react-router-dom";

import {AppShell, Burger, Center} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {Header} from '@/components/header/Header.tsx';
export const FrontLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main><Center><Outlet/></Center></AppShell.Main>
    </AppShell>
  );
}
