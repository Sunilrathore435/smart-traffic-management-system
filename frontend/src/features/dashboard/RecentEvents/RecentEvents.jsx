import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { historyApi } from "../../../services/api";
import RecentEventItem from "./RecentEventItem";

import styles from "./RecentEvents.module.css";

function RecentEvents() {

    const navigate = useNavigate();

    const [events, setEvents] = useState([]);

    useEffect(() => {

        loadHistory();

        const timer = setInterval(

            loadHistory,

            3000

        );

        return () => clearInterval(timer);

    }, []);

    async function loadHistory() {

        try {

            const history = await historyApi.getAll();

            setEvents(history);

        }

        catch (error) {

            console.error("Failed to load recent events", error);

        }

    }

    return (

        <section className={styles.container}>

            <header className={styles.header}>

                <div>

                    <h2>
                        📋 Recent Events
                    </h2>

                    <p>
                        Latest traffic activities
                    </p>

                </div>

                <button
                    onClick={() => navigate("/history")}
                >

                    View All

                    <FaArrowRight />

                </button>

            </header>

            {
                events.length === 0 ? (

                    <div className={styles.empty}>

                        <h3>
                            No Recent Events
                        </h3>

                        <p>
                            Waiting for simulation...
                        </p>

                    </div>

                ) : (

                    <div className={styles.list}>

                        {
                            events
                                .slice(0, 5)
                                .map(event => (

                                    <RecentEventItem
                                        key={event.simulationId}
                                        event={event}
                                    />

                                ))
                        }

                    </div>

                )
            }

        </section>

    );

}

export default RecentEvents;