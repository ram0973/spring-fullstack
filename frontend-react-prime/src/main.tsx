import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import "primereact/resources/themes/lara-light-indigo/theme.css";
//import "primereact/resources/themes/viva-light/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
import {PrimeReactProvider} from "primereact/api";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <PrimeReactProvider value={{ripple: true,}}>
            <App/>
        </PrimeReactProvider>
    </React.StrictMode>,
)
