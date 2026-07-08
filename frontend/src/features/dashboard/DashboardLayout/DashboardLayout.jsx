import DashboardOverview from "../DashboardOverview";
import DashboardMap from "../DashboardMap";
import DashboardAI from "../DashboardAI";
import DashboardAnalytics from "../DashboardAnalytics";
import DashboardTimeline from "../DashboardTimeline";

import styles from "./DashboardLayout.module.css";

function DashboardLayout() {

    return (

        <section className={styles.container}>

            <div className="fade-up delay-1">

                <DashboardOverview />

            </div>

            <section className={styles.middle}>

                <div className="fade-up delay-2">

                    <DashboardMap />

                </div>

                <div className="fade-up delay-3">

                    <DashboardAI />

                </div>

            </section>

            <div className="fade-up delay-4">

                <DashboardAnalytics />

            </div>

            <div className="fade-up delay-5">

                <DashboardTimeline />

            </div>

        </section>

    );

}

export default DashboardLayout;