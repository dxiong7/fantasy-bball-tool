
// IMPORTANT: Replace with your actual Yahoo application client ID.
const CLIENT_ID = 'dj0yJmk9enFFTUtqdk1PSTJQJmQ9WVdrOWVtMW9iRWx4ZVdzbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWE3';

// Production redirect URI - update this when you deploy
const REDIRECT_URI = 'https://your-domain.com/callback'; // Replace with your production domain

// Check if we're in development mode
const isDevelopment = () => {
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1' ||
         window.location.hostname.includes('ngrok.io') ||
         process.env.NODE_ENV === 'development';
};

export const getLoginUrl = (): string => {
  // Use mock authentication for local development
  if (isDevelopment()) {
    // Mock authentication for local development
    setTimeout(() => {
      localStorage.setItem('yahoo_access_token', 'mock_token_for_testing');
      window.location.href = '/dashboard';
    }, 1000);
    return '#';
  }
  
  // Real Yahoo OAuth for production
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'token', // Use Implicit Grant flow for client-side app
  });
  return `https://api.login.yahoo.com/oauth2/request_auth?${params.toString()}`;
};

export const handleAuthentication = (): boolean => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');

    if (accessToken) {
      localStorage.setItem('yahoo_access_token', accessToken);
      // In a real app, you might want to also store expiry time
      return true;
    }
    return false;
  };

export const logout = (): void => {
  localStorage.removeItem('yahoo_access_token');
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('yahoo_access_token') !== null;
};
