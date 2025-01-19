import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/tiptap/styles.css';
import {createTheme, MantineProvider} from '@mantine/core';
import {RouterProvider} from "react-router-dom";
import {router} from "./router.tsx";
import {ModalsProvider} from "@mantine/modals";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Notifications} from "@mantine/notifications";
import {AuthProvider} from "@/common/context/AuthProvider.tsx";

const theme = createTheme({
  cursorType: 'pointer',
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MantineProvider defaultColorScheme="light" theme={theme}>
          <Notifications/>
          <ModalsProvider>
            <RouterProvider router={router}/>
          </ModalsProvider>
        </MantineProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
