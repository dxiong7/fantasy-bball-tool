
// IMPORTANT: Replace with your actual Yahoo application client ID.
const CLIENT_ID = 'YOUR_CLIENT_ID';
const REDIRECT_URI = 'http://localhost:3000/callback';

export const getLoginUrl = (): string => {
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
