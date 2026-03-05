import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const url = state.url;


  if (url.startsWith('/teacher') && !authService.isTeacher()) {
    console.warn('Student próbuje wejść do nauczyciela! Przekierowuję...');
    router.navigate(['/student/dashboard']);
    return false;
  }


  if (url.startsWith('/student') && !authService.isStudent()) {
    console.warn('Nauczyciel próbuje wejść do studenta! Przekierowuję...');
    router.navigate(['/teacher/dashboard']);
    return false;
  }

  return true;
};