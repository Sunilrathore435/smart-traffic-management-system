import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import HistoryEngine from "../../history/HistoryEngine";
import RecentEventItem from "./RecentEventItem";

import styles from "./RecentEvents.module.css";

function RecentEvents() {

    const navigate = useNavigate();

    const [events, setEvents] = useState(
        HistoryEngine.getEvents()
    );

    useEffect(() => {

        const listener = (history) => {

            setEvents(history);

        };

        HistoryEngine.subscribe(listener);

        return () => {

            HistoryEngine.unsubscribe(listener);

        };

    }, []);

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

                events.length === 0 ?

                    (

                        <div className={styles.empty}>

                            <h3>

                                No Recent Events

                            </h3>

                            <p>

                                Waiting for simulation...

                            </p>

                        </div>

                    )

                    :

                    (

                        <div className={styles.list}>

                            {

                                events
                                    .slice(0, 5)
                                    .map(event => (

                                        <RecentEventItem

                                            key={event.id}

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