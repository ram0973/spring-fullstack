import {Outlet} from "react-router-dom";

import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {NavbarColored} from '@/components/navbar/NavbarColored.tsx'
import {Header} from "@/components/header/Header.tsx";

export const AdminLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 330,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header/>
      </AppShell.Header>

      <AppShell.Navbar p="md"><NavbarColored/></AppShell.Navbar>

      <AppShell.Main><Outlet/></AppShell.Main>
    </AppShell>
  );
}
