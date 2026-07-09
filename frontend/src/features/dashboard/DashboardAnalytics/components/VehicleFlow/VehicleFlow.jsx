import VehicleFlowHeader from "./Header";
import VehicleFlowChart from "./Chart";
import VehicleFlowFooter from "./Footer";

import styles from "./VehicleFlow.module.css";

function VehicleFlow() {

    return (

        <div className={styles.wrapper}>

            <VehicleFlowHeader />

            <VehicleFlowChart />

            <VehicleFlowFooter />

        </div>

    );

}

export default VehicleFlow;