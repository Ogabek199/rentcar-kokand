import {useEffect} from "react";
import Layout from "./components/Layout/Layout";
import {setupGlobalErrorHandler, ErrorBoundary} from "./utils/errorLogger";

function App() {
    useEffect(() => {
        setupGlobalErrorHandler();
    }, []);

    return (
        <ErrorBoundary>
            <Layout/>
        </ErrorBoundary>
    );
}

export default App;
