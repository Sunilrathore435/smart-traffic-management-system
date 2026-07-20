import { useEffect, useMemo, useState, useCallback } from "react";

import LogsHeader from "./LogsHeader";
import StatisticsBar from "./StatisticsBar";
import LogsToolbar from "./LogsToolbar";
import EventTimeline from "./EventTimeline";

import { historyApi } from "../../services/api";

import styles from "./History.module.css";

function History() {

    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("ALL");

    const [refreshing, setRefreshing] = useState(false);

    const loadHistory = useCallback(async () => {

        if (refreshing) return;

        try {

            setRefreshing(true);

            const history = await historyApi.getAll();

            setEvents(history);

        }

        catch (error) {

            console.error("Failed to load history", error);

        }

        finally {

            setRefreshing(false);

            setLoading(false);

        }

    }, [refreshing]);

    useEffect(() => {

        loadHistory();

        const timer = setInterval(() => {

            if (!document.hidden) {

                loadHistory();

            }

        }, 5000);

        return () => clearInterval(timer);

    }, [loadHistory]);

    const filteredEvents = useMemo(() => {

        const keyword = search.trim().toLowerCase();

        return events.filter(event => {

            const category =

                event.emergencyTriggered
                    ? "EMERGENCY"
                    : "SIMULATION";

            const matchesFilter =

                filter === "ALL" ||
                filter === category;

            const searchable = [

                event.signalPhase,

                event.currentSignalPhase,

                event.reason,

                event.greenTime,

                event.vehiclesPassed

            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            const matchesSearch =

                searchable.includes(keyword);

            return matchesFilter && matchesSearch;

        });

    }, [events, search, filter]);

    return (

        <section className={styles.container}>

            <LogsHeader
                connected={true}
                live={true}
                uptime="History Mode"
                database="MongoDB Atlas"
                api="Spring Boot 3.5"
            />

            <StatisticsBar

                events={events}

            />

            <LogsToolbar

                search={search}

                setSearch={setSearch}

                filter={filter}

                setFilter={setFilter}

                reloadHistory={loadHistory}

            />

            {

                loading ? (

                    <div className={styles.loading}>

                        <div className={styles.loader}></div>

                        <p>

                            Loading traffic history...

                        </p>

                    </div>

                ) : (

                    <EventTimeline

                        events={filteredEvents}

                    />

                )

            }

        </section>

    );

}

export default History;