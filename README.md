# DealerXP

Compete. Collaborate. Deliver.

**DealerXP** is a gamified performance monitoring platform designed to sit on top of a car dealership's existing workflow systems. It tracks real operational milestones (Sales, Finance, Accounts, PDI, RTO, and Delivery) and translates them into points (XP), active streaks, quests, and branch leaderboards to incentivize dealership teams, reduce cycle times, and prevent low-effort spamming (gaming).

---

## 📂 Repository Structure

This repository is structured as a monorepo containing both backend and frontend modules:

*   **`/backend`**: FastAPI backend containing the core scoring engine, anti-gaming logic, anomaly detection service, and API endpoints.
*   **`/frontend`**: React + Vite + Tailwind CSS frontend application comprising:
    *   **Player dashboards** for Sales DSEs and Finance specialists.
    *   **Leaderboards** (individual and branch scopes).
    *   **Booking Timeline** (the SVG "Race Track" centerpiece).
    *   **Admin Console** (points weight editor and anomaly logger).
    *   **Analytics Page** (cycle-time analysis and action-mix charts).
*   **`/shared`**: Shared configurations and catalog references.

---

## ✨ Key Frontend Features

### 1. Booking Timeline (SVG "Race Track")
The centerpiece screen of DealerXP visualizes a single car booking's journey across 7 critical workflow stages (Booking Created, Discount Approved, Finance Approved, Invoice Approved, RTO Request, PDI Completed, Delivered) represented as a linear race track.

### 2. Demo-Critical Animations
*   **Relay Bonus Moment:** Visualizes cross-department collaboration. When a Finance approval unblocks a DSE, both users' XP counters animate and jump together, displaying a connecting "Relay Bonus" notification.
*   **Cap Firing Moment:** Visualizes anti-gaming limits. If an executive tries to spam a repeatable action (like writing comments), the counter stops increasing and triggers a "Capped" visual indicator with an explanation.

### 3. Admin Console
*   **Action Weight Editor:** Displays weights for scoring actions with inline edit capabilities, saving configurations globally.
*   **Anti-Gaming Audit Panel:** Lists real-time anomaly log cards (High/Medium/Low severity risk flags) with action triggers to resolve flags.

### 4. Branch Analytics
*   **KPI Summary Widgets:** Tracking cycle time, active bookings, active employees, and anomalies.
*   **Stage Cycle-Time Chart:** Recharts vertical bar chart displaying average hours elapsed between major milestones.
*   **Action-Mix Chart:** Recharts donut chart demonstrating which actions drive overall point volumes.

### 5. Theme & Styling
*   **Dark/Light Mode:** Toggle button in the header with full stylesheet overrides translating all panels, text, and tables to a dark palette.
*   **Sticky Sidebar:** Sticky desktop layout holding navigation items and profile/logout options pinned to the viewport.

---

## 🚀 Frontend Quick Start

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18+ recommended)

### Run Locally
1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install --legacy-peer-deps
    ```
3.  Launch the local development server:
    ```bash
    npm run dev
    ```
4.  Open the local server URL (usually `http://localhost:5173/`).

### Production Build
To compile the production bundles:
```bash
npm run build
```

---

## 🛠️ Technology Stack
*   **Core:** React 18, React Router v6
*   **Styling:** Tailwind CSS, Vanilla CSS
*   **Animation:** Framer Motion, CSS Keyframes
*   **Icons:** Lucide React
*   **Charts:** Recharts
