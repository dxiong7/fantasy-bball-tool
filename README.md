# Yahoo Fantasy Lineup Optimizer

This is a web application designed to help you automate your Yahoo Fantasy Basketball lineups. It connects to your Yahoo Fantasy account, fetches your teams and rosters, and provides a tool to automatically start your active players for the current day.

## Features

*   **Yahoo Fantasy Integration:** Securely connect your Yahoo account using OAuth 2.0.
*   **Team Management:** View all your fantasy basketball teams in one place.
*   **Roster Visualization:** See your full roster, including starters, bench players, and injured players.
*   **Automatic Lineup Optimization:** With a single click, automatically move active players from your bench to your starting lineup.

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or later recommended)
*   A Yahoo Fantasy Sports account
*   A Yahoo Developer application with a Client ID. You can create one on the [Yahoo Developer Network](https://developer.yahoo.com/).

### Quickstart

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure your Yahoo Client ID:**
    - Open the file `services/authService.ts`.
    - Replace the placeholder value `'YOUR_CLIENT_ID'` with your actual Yahoo application Client ID.
    - **Important:** Ensure your Yahoo application's "Redirect URI" is set to `http://localhost:3000/callback`.

4.  **Run the application:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.
