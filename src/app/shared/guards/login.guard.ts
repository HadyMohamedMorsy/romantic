import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { constantsApp } from '../config';
import { AuthService } from '../services';

export const LoginGuard: CanActivateFn = () => {
  const isLoggedIn = inject(AuthService).isLoggedIn;

  if (isLoggedIn()) {
    const router = inject(Router);
    router.navigateByUrl(constantsApp.LOGIN_SUCCESS_REDIRECT_URL);
    return false;
  }
  return true;
};
