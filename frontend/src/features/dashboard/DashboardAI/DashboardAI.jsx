import GlassCard from "../../../components/ui/GlassCard";

import AIHeader from "./sections/AIHeader";
import AISystemStatus from "./sections/AISystemStatus";
import AIDecision from "./sections/AIDecision";
import AIConfidence from "./sections/AIConfidence";
import AIRecommendation from "./sections/AIRecommendation";
import AIFooter from "./sections/AIFooter";

import styles from "./DashboardAI.module.css";

function DashboardAI() {

    return (

        <GlassCard className={styles.container}>

            <AIHeader />

            <AISystemStatus />

            <AIDecision />

            <AIConfidence />

            <AIRecommendation />

            <AIFooter />

        </GlassCard>

    );

}

export default DashboardAI;