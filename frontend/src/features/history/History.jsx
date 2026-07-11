import { useEffect, useMemo, useState } from "react";

import LogsHeader from "./LogsHeader";
import StatisticsBar from "./StatisticsBar";
import LogsToolbar from "./LogsToolbar";
import EventTimeline from "./EventTimeline";
import HistoryEngine from "./HistoryEngine";

import styles from "./History.module.css";

function History() {

    const [events, setEvents] = useState(
        HistoryEngine.getEvents()
    );

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("ALL");

    // =====================================
    // Listen History Updates
    // =====================================

    useEffect(() => {

        const listener = (history) => {

            setEvents(history);

        };

        HistoryEngine.subscribe(listener);

        return () => {

            HistoryEngine.unsubscribe(listener);

        };

    }, []);

    // =====================================
    // Search + Filter
    // =====================================

    const filteredEvents = useMemo(() => {

        return events.filter(event => {

            const category =
                event.category || event.type;

            const matchesFilter =
                filter === "ALL" ||
                category === filter;

            const text = (

                event.title +
                " " +
                event.description

            ).toLowerCase();

            const matchesSearch =
                text.includes(
                    search.toLowerCase()
                );

            return (
                matchesFilter &&
                matchesSearch
            );

        });

    }, [

        events,

        search,

        filter

    ]);

    return (

        <section className={styles.container}>

            <LogsHeader />

            <StatisticsBar
                events={events}
            />

            <LogsToolbar

                search={search}

                setSearch={setSearch}

                filter={filter}

                setFilter={setFilter}

            />

            <EventTimeline
                events={filteredEvents}
            />

        </section>

    );

}

export default History;