import { CanActivateFn, Router } from '@angular/router';
import { AuthGoogleService } from '../auth-google.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthGoogleService = inject(AuthGoogleService);
  const router: Router = inject(Router);

  if (authService.getIsLoggedIn()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
