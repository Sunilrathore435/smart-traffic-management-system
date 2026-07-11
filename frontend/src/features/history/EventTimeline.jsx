import { useEffect, useState } from "react";

import EventCard from "./EventCard";
import HistoryEngine from "./HistoryEngine";

import styles from "./EventTimeline.module.css";
import {FaFileCircleXmark} from "react-icons/fa6";

function EventTimeline() {

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

    if (events.length === 0) {

        return (

            <section className={styles.emptyState}>

                <FaFileCircleXmark className={styles.icon} />

                <h2>No Events Yet</h2>

                <p>
                    Waiting for simulation...
                </p>

            </section>

        );

    }

    return (

        <section className={styles.timeline}>

            {

                events.map(event => (

                    <EventCard

                        key={event.id}

                        event={event}

                    />

                ))

            }

        </section>

    );

}

export default EventTimeline;