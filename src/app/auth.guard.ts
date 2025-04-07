import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from './api.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const apiService = inject(ApiService); // Inject the service
  const isLoggedIn = apiService.isLoggedIn(); // Check login status
  const router = inject(Router); // Inject Router

  console.log('logged in status', isLoggedIn);
  return isLoggedIn ? true : router.createUrlTree(['/login']);
};
