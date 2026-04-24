import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // 1. Si la requête va vers l'authentification, on ne touche à rien
  if (req.url.includes('/api/auth/authenticate')) {
    return next(req);
  }

  const token = localStorage.getItem('access_token');
  console.log("Token intercepté :", token ? "Présent" : "ABSENT");

  // 2. Pour les autres requêtes, on ajoute le token s'il existe
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
