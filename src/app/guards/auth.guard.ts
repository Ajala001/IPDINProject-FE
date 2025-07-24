import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth_service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  const isLoggedIn = !!token;

  if (isLoggedIn) {
    return true;
  } else {
    return router.createUrlTree(['/sign-in'], {
      queryParams: { returnUrl: state.url }
    });
  }
};
