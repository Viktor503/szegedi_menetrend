import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user') as string;
  if(user){
    if(user === 'null'){
      return false;
    }
    return true;
  }
  return false;
};
