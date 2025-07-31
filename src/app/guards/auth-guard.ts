import { CanActivateFn, Router } from '@angular/router';
import { AuthGoogleService } from '../auth-google.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService: AuthGoogleService = inject(AuthGoogleService);
  const router: Router = inject(Router);

  // aguarda a inicialização da autenticação, evitando race condition
  // dessa forma ele permanece na pagina atual no refresh da pagina
  await authService.waitForAuthInit();

  if (authService.getIsLoggedIn()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
