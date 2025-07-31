import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com', // verifica se o token é valido
  redirectUri: window.location.origin, // url de redirecionamento após o login	
  clientId: environment.GOOGLE_CLIENT_ID, // id do cliente
  scope: 'openid profile email', // scopes que o cliente pode acessar
  strictDiscoveryDocumentValidation: false, // desativa a validação do discovery document
};