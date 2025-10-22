
const CLIENT_ID = import.meta.env.VITE_YAHOO_CLIENT_ID;

// Use Vercel's preview URL or a local URL for the redirect URI
const REDIRECT_URI = import.meta.env.PROD
  ? `https://${import.meta.env.VITE_VERCEL_URL}/callback`
  : 'http://localhost:3000/callback';

export const getLoginUrl = (): string => {
  if (!CLIENT_ID) {
    throw new Error("VITE_YAHOO_CLIENT_ID is not set. Please check your .env file or Vercel environment variables.");
  }

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
