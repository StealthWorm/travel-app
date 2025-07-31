import { inject, Injectable, signal } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {
  private oauthService: OAuthService = inject(OAuthService);
  private router: Router = inject(Router);
  private isLoggedIn = signal(false); // verifica se o usuário está logado e atualiza a UI
  private userProfile = signal<any>(null); // armazena o perfil do usuário. Usamos any pois podemos mudar o provedor depois
  private authInitSubject = new BehaviorSubject<boolean>(false); // controla o estado de inicialização da autenticação

  constructor() {
    this.initConfig();
  }

  async initConfig() {
    try {
      this.oauthService.configure(authConfig);
      this.oauthService.setupAutomaticSilentRefresh();

      await this.oauthService.loadDiscoveryDocumentAndTryLogin();

      const isAuthenticated = this.oauthService.hasValidAccessToken();
      this.isLoggedIn.set(isAuthenticated);

      if (isAuthenticated) {
        this.userProfile.set(this.oauthService.getIdentityClaims());
      }

      this.authInitSubject.next(true);
    } catch (error) {
      console.error('Error initializing authentication:', error);
      this.authInitSubject.next(true);
    }
  }

  async waitForAuthInit(): Promise<void> {
    if (this.authInitSubject.value) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      this.authInitSubject.subscribe((initialized) => {
        if (initialized) {
          resolve();
        }
      });
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

  getIsLoggedIn() {
    return this.isLoggedIn();
  }

  getUserProfile() {
    return this.userProfile();
  }

  refreshAuthState() {
    const isAuthenticated = this.oauthService.hasValidAccessToken();
    this.isLoggedIn.set(isAuthenticated);

    if (isAuthenticated) {
      this.userProfile.set(this.oauthService.getIdentityClaims());
    }
  }
}
