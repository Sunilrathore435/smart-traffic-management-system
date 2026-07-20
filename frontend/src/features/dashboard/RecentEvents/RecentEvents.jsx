import { useEffect, useState, useCallback } from "react";
import { FaArrowRight, FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { historyApi } from "../../../services/api";
import RecentEventItem from "./RecentEventItem";

import styles from "./RecentEvents.module.css";

function RecentEvents() {

    const navigate = useNavigate();

    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadHistory = useCallback(async () => {

        try {

            const history = await historyApi.getAll();

            setEvents(history);

        }

        catch (error) {

            console.error(
                "Failed to load recent events",
                error
            );

        }

        finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        loadHistory();

        const timer = setInterval(

            loadHistory,

            5000

        );

        return () => clearInterval(timer);

    }, [loadHistory]);

    return (

        <section className={styles.container}>

            <header className={styles.header}>

                <div>

                    <h2>

                        <FaHistory />

                        Recent Events

                    </h2>

                    <p>

                        Live simulation history

                    </p>

                </div>

                <button
                    onClick={() => navigate("/history")}
                >

                    View History

                    <FaArrowRight />

                </button>

            </header>

            {

                loading ? (

                    <div className={styles.loading}>

                        <div className={styles.loader}></div>

                        <span>

                            Loading events...

                        </span>

                    </div>

                ) : events.length === 0 ? (

                    <div className={styles.empty}>

                        <h3>

                            No Events Yet

                        </h3>

                        <p>

                            Waiting for the first simulation cycle...

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