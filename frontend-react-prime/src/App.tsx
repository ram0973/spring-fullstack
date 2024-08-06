import './App.css'
import UserTable from "./UserTable.tsx";
import {Sidebar} from "primereact/sidebar";

function App() {

    return (
        <>
            {/*<Sidebar visible={true} onHide={() => setVisible(false)} modal={false}>*/}
            {/*    <h2>Sidebar</h2>*/}
            {/*    <p>*/}
            {/*        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore*/}
            {/*        et dolore magna aliqua.*/}
            {/*        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo*/}
            {/*        consequat.*/}
            {/*    </p>*/}
            {/*</Sidebar>*/}

            <UserTable/>
        </>
    )
}

export default App
