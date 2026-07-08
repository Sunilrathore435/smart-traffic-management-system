import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import DashboardPage from "../pages/Dashboard/DashboardPage";
import AnalyticsPage from "../pages/Analytics/AnalyticsPage";
import HistoryPage from "../pages/History/HistoryPage";
import SettingsPage from "../pages/Settings/SettingsPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import UIPlayground from "../pages/UIPlayground";

function AppRouter() {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/ui" element={<UIPlayground />} />
                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />

                <Route element={<MainLayout />}>

                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />

                    <Route
                        path="/analytics"
                        element={<AnalyticsPage />}
                    />

                    <Route
                        path="/history"
                        element={<HistoryPage />}
                    />

                    <Route
                        path="/settings"
                        element={<SettingsPage />}
                    />

                </Route>

                <Route
                    path="*"
                    element={<NotFoundPage />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default AppRouter;