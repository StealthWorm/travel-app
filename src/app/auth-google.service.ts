import { inject, Injectable, signal } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {
  private oauthService: OAuthService = inject(OAuthService);
  private router: Router = inject(Router);
  private isLoggedIn = signal(false); // verifica se o usuário está logado e atualiza a UI
  private userProfile = signal<any>(null); // armazena o perfil do usuário. Usamos any pois podemos mudar o provedor depois

  constructor() {
    this.initConfig();
  }

  initConfig() {
    this.oauthService.configure(authConfig);
    this.oauthService.setupAutomaticSilentRefresh(); // atualiza o token automaticamente, sem precisar de interação do usuário
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.isLoggedIn.set(this.oauthService.hasValidAccessToken());
      this.userProfile.set(this.oauthService.getIdentityClaims());
    });
  }

  login() {
    this.oauthService.initImplicitFlow(); // inicia o fluxo de login
  }

  logout() {
    this.oauthService.logOut();
    this.isLoggedIn.set(false);
    this.userProfile.set(null);
    this.router.navigate(['/']);
  }

  // $  é usado como uma convenção de nomenclatura para indicar que uma propriedade ou método 
  // retorna um Observable ou Signal. É uma prática comum na comunidade Angular para tornar o código mais
  //  legível e identificar facilmente quais propriedades são reativas.
  get isLoggedIn$() {
    return this.isLoggedIn.asReadonly();
  }

  getUserProfile() {
    return this.userProfile();
  }
}
