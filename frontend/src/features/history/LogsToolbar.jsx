import {
    FaSearch,
    FaFilter,
    FaTrash
} from "react-icons/fa";

import { historyApi } from "../../services/api";

import styles from "./LogsToolbar.module.css";

function LogsToolbar({

                         search,

                         setSearch,

                         filter,

                         setFilter,

                         reloadHistory

                     }) {

    const clearLogs = async () => {

        if (!window.confirm(
            "Clear all simulation history?"
        )) {
            return;
        }

        try {

            await historyApi.clear();

            await reloadHistory();

            alert("History cleared successfully.");

        }

        catch (error) {

            console.error(
                "Failed to clear history",
                error
            );

            alert("Failed to clear history.");

        }

    };
    return (

        <section className={styles.toolbar}>

            <div className={styles.search}>

                <FaSearch />

                <input

                    type="text"

                    placeholder="Search by lane, reason or emergency..."

                    value={search}

                    onChange={(event) =>
                        setSearch(event.target.value)
                    }

                />

            </div>

            <select

                className={styles.select}

                value={filter}

                onChange={(event) =>
                    setFilter(event.target.value)
                }

            >

                <option value="ALL">
                    All Events
                </option>

                <option value="SIMULATION">
                    Simulation
                </option>

                <option value="EMERGENCY">
                    Emergency
                </option>

            </select>

            <button className={styles.filterButton}>

                <FaFilter />

                Filter

            </button>

            <button

                className={styles.clearButton}

                onClick={clearLogs}

            >

                <FaTrash />

                Clear

            </button>

        </section>

    );

}

export default LogsToolbar;