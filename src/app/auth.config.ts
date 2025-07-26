import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com', // verifica se o token é valido
  redirectUri: window.location.origin, // url de redirecionamento após o login	
  clientId: '326974681125-jahbd1co5hdq1kje128cgktq85e1crtc.apps.googleusercontent.com', // id do cliente
  scope: 'openid profile email', // scopes que o cliente pode acessar
  strictDiscoveryDocumentValidation: false, // desativa a validação do discovery document
};