import { FaClockRotateLeft, FaFileCircleXmark } from "react-icons/fa6";

import EventCard from "./EventCard";

import styles from "./EventTimeline.module.css";

function EventTimeline({ events = [] }) {

    if (!events.length) {

        return (

            <section className={styles.emptyState}>

                <FaFileCircleXmark className={styles.icon} />

                <h2>No Events Yet</h2>

                <p>

                    Waiting for the traffic simulation to generate history.

                </p>

            </section>

        );

    }

    return (

        <section className={styles.container}>

            <header className={styles.header}>

                <div>

                    <h2>

                        <FaClockRotateLeft />

                        Event Timeline

                    </h2>

                    <p>

                        {events.length} recorded simulation event{events.length > 1 ? "s" : ""}

                    </p>

                </div>

            </header>

            <div className={styles.timeline}>

                {

                    events.map((event, index) => (

                        <div
                            key={event.simulationId ?? `${event.simulationTime}-${index}`}
                            className={styles.item}
                            style={{
                                animationDelay: `${index * 60}ms`
                            }}
                        >

                            <EventCard event={event} />

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default EventTimeline;