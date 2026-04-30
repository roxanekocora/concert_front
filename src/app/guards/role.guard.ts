import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(Auth);
    const router = inject(Router);

    const role = authService.getUserRole();

    if (role && allowedRoles.includes(role)) {
      return true; // ✅ bon rôle → accès autorisé
    }

    router.navigate(['/login']); // ❌ mauvais rôle → retour login
    return false;
  };
};