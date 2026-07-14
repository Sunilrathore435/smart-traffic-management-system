import { useDashboard } from "./../hooks";

function UIPlayground() {

    const {

        dashboard,

        loading,

        error

    } = useDashboard();

    if (loading) {

        return <h1>Loading Dashboard...</h1>;

    }

    if (error) {

        return (

            <div>

                <h2>API Error</h2>

                <pre>{error.message}</pre>

            </div>

        );

    }

    return (

        <div
            style={{
                padding: 30,
                color: "white",
                fontFamily: "monospace"
            }}
        >

            <h2>Dashboard API Test ✅</h2>

            <pre>

                {JSON.stringify(

                    dashboard,

                    null,

                    2

                )}

            </pre>

        </div>

    );

}

export default UIPlayground;