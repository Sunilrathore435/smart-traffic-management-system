import EventCard from "./EventCard";

import styles from "./EventTimeline.module.css";
import { FaFileCircleXmark } from "react-icons/fa6";

function EventTimeline({ events = [] }) {

    if (events.length === 0) {

        return (

            <section className={styles.emptyState}>

                <FaFileCircleXmark className={styles.icon} />

                <h2>No Events Yet</h2>

                <p>
                    Waiting for traffic simulation...
                </p>

            </section>

        );

    }

    return (

        <section className={styles.timeline}>

            {

                events.map(event => (

                    <EventCard

                        key={event.simulationId}

                        event={event}

                    />

                ))

            }

        </section>

    );

}

export default EventTimeline;