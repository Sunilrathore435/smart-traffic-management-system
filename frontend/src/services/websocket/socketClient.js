import { Client } from "@stomp/stompjs";

class SocketClient {

    constructor() {

        this.client = null;

        this.listeners = [];

        this.connected = false;

    }

    notify(event) {

        this.listeners.forEach(listener => {

            try {

                listener(event);

            } catch (error) {

                console.error("Listener Error:", error);

            }

        });

    }

    connect() {

        if (this.client?.active) {
            return;
        }

        this.client = new Client({

            brokerURL: "ws://localhost:8080/ws",

            reconnectDelay: 5000,

            heartbeatIncoming: 4000,

            heartbeatOutgoing: 4000,

            debug: () => {}

        });

        // =============================
        // Connected
        // =============================

        this.client.onConnect = () => {

            if (!this.connected) {

                this.connected = true;

                console.log("🟢 Backend Connected");

                this.notify({
                    type: "CONNECTED"
                });

            }

            this.client.subscribe("/topic/traffic", () => {

                // Traffic update only
                this.notify({
                    type: "UPDATE"
                });

            });

        };

        // =============================
        // Disconnected
        // =============================

        const disconnect = () => {

            if (this.connected) {

                this.connected = false;

                console.log("🔴 Backend Offline");

                this.notify({
                    type: "DISCONNECTED"
                });

            }

        };

        this.client.onDisconnect = disconnect;

        this.client.onWebSocketClose = disconnect;

        this.client.onWebSocketError = disconnect;

        this.client.onStompError = frame => {

            console.error(
                "STOMP Error:",
                frame.headers["message"]
            );

        };

        this.client.activate();

    }

    disconnect() {

        if (this.client) {

            this.client.deactivate();

            this.client = null;

        }

        if (this.connected) {

            this.connected = false;

            this.notify({
                type: "DISCONNECTED"
            });

        }

    }

    subscribe(listener) {

        if (!this.listeners.includes(listener)) {

            this.listeners.push(listener);

        }

    }

    unsubscribe(listener) {

        this.listeners =
            this.listeners.filter(
                l => l !== listener
            );

    }

}

export default new SocketClient();