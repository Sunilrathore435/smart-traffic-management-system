import SettingsEngine from "../settings/SettingsEngine";

class HistoryEngine {

    constructor() {

        this.events = [];

        this.listeners = [];

        this.lastEvent = null;

        this.settings =
            SettingsEngine.getSettings();

        this.maxEvents =
            this.settings.historyLimit;

        SettingsEngine.subscribe(settings => {

            this.settings = settings;

            this.maxEvents =
                settings.historyLimit;

            this.trimHistory();

        });

    }

    // =====================================
    // Create Event
    // =====================================

    createEvent(event) {

        return {

            id: Date.now(),

            time: new Date().toLocaleTimeString(),

            category: "SYSTEM",

            severity: "INFO",

            ...event

        };

    }

    // =====================================
    // Add Event
    // =====================================

    addEvent(event) {

        if (

            this.lastEvent &&

            this.lastEvent.category === event.category &&

            this.lastEvent.title === event.title &&

            this.lastEvent.description === event.description

        ) {

            return;

        }

        const newEvent =
            this.createEvent(event);

        this.events.unshift(newEvent);

        this.lastEvent = newEvent;

        this.trimHistory();

        this.notify();

    }

    // =====================================
    // Trim History
    // =====================================

    trimHistory() {

        while (

            this.events.length >

            this.maxEvents

            ) {

            this.events.pop();

        }

    }

    // =====================================
    // Recent Events
    // =====================================

    getRecent(limit = 10) {

        return this.events.slice(0, limit);

    }

    // =====================================
    // Search
    // =====================================

    search(keyword = "") {

        const text =
            keyword.toLowerCase();

        return this.events.filter(event =>

            event.title
                .toLowerCase()
                .includes(text) ||

            event.description
                .toLowerCase()
                .includes(text)

        );

    }

    // =====================================
    // Filter
    // =====================================

    filter(category = "ALL") {

        if (category === "ALL") {

            return this.getEvents();

        }

        return this.events.filter(

            event =>

                event.category === category

        );

    }

    // =====================================
    // Statistics
    // =====================================

    getStatistics() {

        return {

            total: this.events.length,

            ai:
            this.filter("AI").length,

            signal:
            this.filter("SIGNAL").length,

            emergency:
            this.filter("EMERGENCY").length,

            analytics:
            this.filter("ANALYTICS").length,

            system:
            this.filter("SYSTEM").length

        };

    }

    // =====================================
    // Export
    // =====================================

    export() {

        return JSON.stringify(

            this.events,

            null,

            2

        );

    }

    // =====================================
    // Max Events
    // =====================================

    setMaxEvents(limit) {

        this.maxEvents = limit;

        this.trimHistory();

        this.notify();

    }

    // =====================================
    // Subscribe
    // =====================================

    subscribe(listener) {

        this.listeners.push(listener);

    }

    unsubscribe(listener) {

        this.listeners =

            this.listeners.filter(

                item =>

                    item !== listener

            );

    }

    notify() {

        const history =
            this.getEvents();

        this.listeners.forEach(

            listener =>

                listener(history)

        );

    }

    // =====================================
    // Getter
    // =====================================

    getEvents() {

        return [...this.events];

    }

    // =====================================
    // Clear
    // =====================================

    clear() {

        this.events = [];

        this.lastEvent = null;

        this.notify();

    }

}

export default new HistoryEngine();