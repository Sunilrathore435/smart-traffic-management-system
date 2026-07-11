import {
    FaSearch,
    FaFilter,
    FaTrash
} from "react-icons/fa";

import HistoryEngine from "./HistoryEngine";

import styles from "./LogsToolbar.module.css";

function LogsToolbar({

                         search,

                         setSearch,

                         filter,

                         setFilter

                     }) {

    const clearLogs = () => {

        if (

            !window.confirm(

                "Clear all operation logs?"

            )

        ) {

            return;

        }

        HistoryEngine.clear();

    };

    return (

        <section className={styles.toolbar}>

            <div className={styles.search}>

                <FaSearch />

                <input

                    type="text"

                    placeholder="Search events by title, description, category, or severity..."

                    value={search}

                    onChange={(event)=>

                        setSearch(

                            event.target.value

                        )

                    }

                />

            </div>


            <select

                className={styles.select}

                value={filter}

                onChange={(event)=>

                    setFilter(

                        event.target.value

                    )

                }

            >

                <option value="ALL">

                    All Events

                </option>

                <option value="AI">

                    AI

                </option>

                <option value="EMERGENCY">

                    Emergency

                </option>

                <option value="SYSTEM">

                    System

                </option>

                <option value="ANALYTICS">

                    Analytics

                </option>

                <option value="BACKEND">

                    Backend

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