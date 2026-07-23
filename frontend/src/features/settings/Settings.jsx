import { useEffect, useState } from "react";
import {
    FaTrafficLight,
    FaBrain,
    FaAmbulance
} from "react-icons/fa";

import SettingsEngine from "./SettingsEngine";
import SettingsOverviewCards from "./SettingsOverviewCards";

import SettingsSection from "./SettingsSection";
import ToggleSwitch from "./ToggleSwitch";
import SliderControl from "./SliderControl";
import SettingsHeader from "./SettingsHeader";
import ActionButtons from "./ActionButtons";

import styles from "./Settings.module.css";

function Settings(){
    const saveSettings = async () => {

        const success =
            await SettingsEngine.save();

        if (success) {

            alert("Configuration saved successfully.");

        } else {

            alert("Failed to save configuration.");

        }

    };

    const resetSettings = async () => {

        if (!window.confirm(
            "Restore default settings?"
        )) {

            return;

        }

        await SettingsEngine.reset();

    };
    const [settings,setSettings]=useState(

        SettingsEngine.getSettings()

    );

    useEffect(() => {

        const listener = (config) => {
            setSettings(config);

        };

        SettingsEngine.subscribe(listener);

        // Load settings from Spring Boot
        SettingsEngine.load();

        return () => {

            SettingsEngine.unsubscribe(listener);

        };

    }, []);

    return (

        <div className={styles.wrapper}>

            <SettingsHeader />
            <SettingsOverviewCards/>
            <div className={styles.grid}>

                <SettingsSection

                    icon={<FaTrafficLight />}

                    title="Simulation"

                    subtitle="Traffic simulation parameters"

                >

                    <ToggleSwitch

                        label="Auto Simulation"

                        description="Start simulation automatically"

                        checked={settings.autoSimulation}

                        onChange={(value)=>

                            SettingsEngine.update(

                                "autoSimulation",

                                value

                            )

                        }

                    />

                    <SliderControl

                        label="Vehicle Spawn Rate"

                        value={settings.vehicleSpawnRate}

                        min={1}

                        max={10}

                        unit="/sec"

                        onChange={(value)=>

                            SettingsEngine.update(

                                "vehicleSpawnRate",

                                value

                            )

                        }

                    />

                </SettingsSection>

                <SettingsSection

                    icon={<FaBrain />}

                    title="Artificial Intelligence"

                    subtitle="Adaptive traffic optimization"

                >

                    <ToggleSwitch

                        label="Adaptive AI"

                        description="Enable intelligent signal optimization"

                        checked={settings.adaptiveAI}

                        onChange={(value)=>

                            SettingsEngine.update(

                                "adaptiveAI",

                                value

                            )

                        }

                    />

                    <SliderControl

                        label="Minimum Green Time"

                        value={settings.minGreenTime}

                        min={5}

                        max={15}

                        unit=" s"

                        onChange={(value)=>

                            SettingsEngine.update(

                                "minGreenTime",

                                value

                            )

                        }

                    />

                    <SliderControl

                        label="Maximum Green Time"

                        value={settings.maxGreenTime}

                        min={15}

                        max={40}

                        unit=" s"

                        onChange={(value)=>

                            SettingsEngine.update(

                                "maxGreenTime",

                                value

                            )

                        }

                    />

                </SettingsSection>

                <SettingsSection

                    icon={<FaAmbulance />}

                    title="Emergency"

                    subtitle="Emergency vehicle priority"

                >

                    <ToggleSwitch

                        label="Emergency Priority"

                        description="Always prioritize emergency vehicles"

                        checked={settings.emergencyPriority}

                        onChange={(value)=>

                            SettingsEngine.update(

                                "emergencyPriority",

                                value

                            )

                        }

                    />

                </SettingsSection>

                <SettingsSection

                    icon={<FaTrafficLight />}

                    title="Analytics"

                    subtitle="Monitoring configuration"

                >

                    <SliderControl

                        label="Refresh Rate"

                        value={settings.refreshRate}

                        min={100}

                        max={1000}

                        step={100}

                        unit=" ms"

                        onChange={(value)=>

                            SettingsEngine.update(

                                "refreshRate",

                                value

                            )

                        }

                    />

                    <SliderControl

                        label="History Limit"

                        value={settings.historyLimit}

                        min={50}

                        max={500}

                        step={50}

                        unit=" events"

                        onChange={(value)=>

                            SettingsEngine.update(

                                "historyLimit",

                                value

                            )

                        }

                    />

                </SettingsSection>

            </div>

            <ActionButtons
                onSave={saveSettings}
                onReset={resetSettings}
            />

        </div>

    );

}

export default Settings;