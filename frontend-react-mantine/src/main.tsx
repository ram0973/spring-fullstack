import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'
import '@mantine/core/styles.css';
import 'mantine-datatable/styles.css';
import {MantineProvider} from '@mantine/core';
import {RouterProvider} from "react-router-dom";
import {router} from "./router.tsx";
import {AuthProvider} from "@/common/context/AuthProvider.tsx";



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <MantineProvider>
        <RouterProvider router={router}/>
      </MantineProvider>
    </AuthProvider>
  </React.StrictMode>,
)
