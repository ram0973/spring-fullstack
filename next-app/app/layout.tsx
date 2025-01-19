'use client';
import "./globals.css";
import "@mantine/core/styles.css";
import React from "react";
import {AppShell, Burger, ColorSchemeScript, Container, mantineHtmlProps, MantineProvider,} from "@mantine/core";
import {theme} from "@/app/theme";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ModalsProvider} from "@mantine/modals";
import {useDisclosure} from "@mantine/hooks";
import {Notifications} from "@mantine/notifications";
import '@mantine/notifications/styles.css';
import {Header} from "@/app/components/header/Header"
import {NavbarColored} from "@/app/components/navbar/NavbarColored";

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  const [opened, {toggle}] = useDisclosure();
  const queryClient = new QueryClient()
  return (
    <html lang="en" {...mantineHtmlProps}>
    <head>
      <ColorSchemeScript/>
      <link rel="shortcut icon" href="/next.svg"/>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"/>
      <title></title>
    </head>
    <body>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications/>
        <ModalsProvider>

          <AppShell className={"appshell"}
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
              <Header/>
            </AppShell.Header>

            <AppShell.Navbar p="sm"><NavbarColored/></AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>

          </AppShell>

        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
    </body>
    </html>
  );
}
