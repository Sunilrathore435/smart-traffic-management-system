import StatusPill from "../components/ui/StatusPill";

function UIPlayground() {

    return (

        <div
            style={{
                padding: 40,
                display: "flex",
                flexDirection: "column",
                gap: 20,
            }}
        >

            <StatusPill
                label="ONLINE"
                status="online"
            />

            <StatusPill
                label="WARNING"
                status="warning"
            />

            <StatusPill
                label="OFFLINE"
                status="offline"
            />

            <StatusPill
                label="MONITORING"
                status="info"
            />

        </div>

    );

}

export default UIPlayground;