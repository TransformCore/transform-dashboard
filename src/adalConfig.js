import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

require('dotenv').config({ path: '../.env' });

export const adalConfig = {
  tenant: process.env.REACT_APP_ADAL_TENANT,
  clientId: process.env.REACT_APP_ADAL_CLIENT_ID,
  redirectUri: process.env.REACT_APP_ADAL_REDIRECT_URI,
  endpoints: {
    api: 'https://graph.microsoft.com'
  },
  cacheLocation: 'sessionStorage'
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(
  authContext,
  adalConfig.endpoints.api
);
