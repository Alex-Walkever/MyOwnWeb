import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SecurityService } from '../../api/services/security.service';
import { UrlStrings, UserRolStrings } from '../../util/utility-strings';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const securityService = inject(SecurityService);

  if(securityService.getAdminRol() === UserRolStrings.isAdmin)
  {
    return true;
  }

  router.navigate([UrlStrings.urlLogin]);
  return true;
};

export const isUserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const securityService = inject(SecurityService);

  if(securityService.getUserRol() === UserRolStrings.isUser)
  {
    return true;
  }

  router.navigate([UrlStrings.urlLogin]);
  return true;
};