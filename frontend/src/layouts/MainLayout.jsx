import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import styles from "./MainLayout.module.css";

function MainLayout() {
    return (
        <div className={styles.layout}>

            <Sidebar />

            <div className={styles.main}>

                <Navbar />

                <main className={styles.content}>
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default MainLayout;