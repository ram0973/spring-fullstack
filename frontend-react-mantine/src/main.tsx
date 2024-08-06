import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'
import '@mantine/core/styles.css';
import 'mantine-datatable/styles.css';
import {createTheme, MantineProvider} from '@mantine/core';
import {RouterProvider} from "react-router-dom";
import {router} from "./router.tsx";
import {AuthProvider} from "@/common/context/AuthProvider.tsx";

const theme = createTheme({
  cursorType: 'pointer',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <MantineProvider defaultColorScheme="light" theme={theme}>
        <RouterProvider router={router}/>
      </MantineProvider>
    </AuthProvider>
  </React.StrictMode>,
)
