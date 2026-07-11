import VehicleFlowHeader from "./Header";
import VehicleFlowChart from "./Chart";
import VehicleFlowFooter from "./Footer";

import styles from "./VehicleFlow.module.css";

function VehicleFlow({ analytics }) {

    return (

        <div className={styles.wrapper}>

            <VehicleFlowHeader
                analytics={analytics}
            />

            <VehicleFlowChart
                analytics={analytics}
            />

            <VehicleFlowFooter
                analytics={analytics}
            />

        </div>

    );

}

export default VehicleFlow;