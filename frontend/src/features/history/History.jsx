import { useEffect, useMemo, useState } from "react";

import LogsHeader from "./LogsHeader";
import StatisticsBar from "./StatisticsBar";
import LogsToolbar from "./LogsToolbar";
import EventTimeline from "./EventTimeline";

import { historyApi } from "../../services/api";

import styles from "./History.module.css";

function History() {

    const [events, setEvents] = useState([]);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("ALL");

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

            console.error("Failed to load history", error);

        }

    }

    const filteredEvents = useMemo(() => {

        return events.filter(event => {

            const category =
                event.emergencyTriggered
                    ? "EMERGENCY"
                    : "SIMULATION";

            const matchesFilter =
                filter === "ALL" ||
                filter === category;

            const text = (

                event.selectedLane +
                " " +
                event.reason

            ).toLowerCase();

            return matchesFilter &&
                text.includes(
                    search.toLowerCase()
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