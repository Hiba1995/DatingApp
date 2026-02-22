import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { ToastService } from '../services/toast-service';
import { NavigationExtras, Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router)
  return next(req).pipe(
    catchError(error =>{
      if(error){
        switch(error.status){
          case 400:
            if(error.error.errors){
              const modelStatusErrors = [];
              for(const key in error.error.errors){
                if(error.error.errors[key]){
                  modelStatusErrors.push(error.error.errors[key]);
                }
                   
              }
               throw modelStatusErrors.flat();
          
            }
            else{
              toast.errorToast(error.error);
            }
            break;
            case 401:
              toast.errorToast('Unauthorized');
              break;
              case 404:
               router.navigateByUrl('/not-found')
                break;
                case 500:
                const navigationExtras: NavigationExtras = {state: {error: error.error}}// prepare some extra data
                router.navigateByUrl('/server-error', navigationExtras) // passes the error to that page 
                break;
            default:
            toast.errorToast('Something went worong');
            break;
        }
      }

      throw error;
})
  )
};
