import React from "react";
import { Navigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import { useScore } from "../hooks/useScore";
import FinanceDashboardPage from "./FinanceDashboardPage";
import DseDashboardPage from "./DseDashboardPage";

export default function DashboardPage() {
    const userId = localStorage.getItem("dealerxp_user_id");

    if (!userId) {
        return <Navigate to="/" replace />;
    }

    const handleLogout = () => {
        localStorage.removeItem("dealerxp_user_id");
        window.location.href = "/";
    };

    const { data: score, loading, error } = useScore(userId);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Loading workspace...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Failed to load user.
            </div>
        );
    }

    const role = (score?.role || "").toLowerCase();

    const isFinance = role.includes("finance");
    const isAdmin = role.includes("admin") || role.includes("manager");

    if (isAdmin) {
        return <Navigate to="/admin" replace />;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-end p-4">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white"
                >
                    <LogOut size={16} />
                    Sign Out
                </button>
            </div>

            {isFinance ? (
                <FinanceDashboardPage userId={userId} />
            ) : (
                <DseDashboardPage userId={userId} />
            )}
        </div>
    );
}