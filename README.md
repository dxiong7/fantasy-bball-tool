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

3.  **Configure Environment Variables:**
    - Create a file named `.env` in the root of the project.
    - Add the following line to the `.env` file, replacing `YOUR_CLIENT_ID` with your actual Yahoo application Client ID:
      ```
      VITE_YAHOO_CLIENT_ID=YOUR_CLIENT_ID
      ```
    - **Important:** Ensure your Yahoo application's "Redirect URI" is set correctly.
      - For local development, use `http://localhost:3000/callback`.
      - For Vercel deployments, add your Vercel production and preview URLs as valid Redirect URIs in the Yahoo Developer settings.

4.  **Run the application:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Vercel Deployment

To deploy this application to Vercel, you will need to set the `VITE_YAHOO_CLIENT_ID` as an environment variable in your Vercel project settings.
