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

3.  **Run the application:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Development vs Production

### 🔧 Development Mode (Local)
- **Mock Authentication**: Automatically uses mock authentication for testing
- **No Yahoo OAuth Required**: Click "Connect" to instantly access the dashboard
- **Full Functionality**: All features work with mock data
- **Visual Indicator**: Blue development banner shows you're in mock mode

### 🚀 Production Deployment

1. **Configure Yahoo OAuth:**
   - Open `services/authService.ts`
   - Replace `CLIENT_ID` with your actual Yahoo application Client ID
   - Update `REDIRECT_URI` to your production domain: `https://your-domain.com/callback`

2. **Update Yahoo Developer App:**
   - Go to [Yahoo Developer Network](https://developer.yahoo.com/)
   - Set Redirect URI to: `https://your-domain.com/callback`

3. **Deploy:**
   ```bash
   npm run build
   # Deploy the 'dist' folder to your hosting service
   ```

### Environment Detection
The app automatically detects the environment:
- **Development**: `localhost`, `127.0.0.1`, `ngrok.io` → Uses mock authentication
- **Production**: Any other domain → Uses real Yahoo OAuth
