import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account-service';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast-service';


export const authGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const toast = inject(ToastService);
   const router = inject(Router);

  const isLoggedIn = accountService.currentUser() || localStorage.getItem('isLoggedIn') === 'true'

  if(isLoggedIn)
    return true;
  const navigation = router.getCurrentNavigation();
  
   if (navigation) {
    toast.errorToast('You Shall Not Pass');
  }


    return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: '/' }
    });
};
