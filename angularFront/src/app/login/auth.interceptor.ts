import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Observable, switchMap, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    if (req.url.includes('/api/token/refresh/')) {
        return next(req);
    }

    const userService = inject(UserService);
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
        const cloned = req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return next(cloned).pipe(
            catchError(error => {
                if (error.status === 403) {
                    const refreshToken = localStorage.getItem('refresh_token');
                    if (!refreshToken) {
                        localStorage.clear();
                        return throwError(() => new Error('Session expirée, veuillez vous reconnecter'));
                    }
                    return userService.refreshToken().pipe(
                        switchMap(response => {
                            if (!response || !response.access) {
                                throw new Error('Réponse de refresh invalide');
                            }
                            localStorage.setItem('access_token', response.access);
                            const newReq = req.clone({
                                setHeaders: { Authorization: `Bearer ${response.access}` }
                            });
                            return next(newReq);
                        }),
                        catchError(refreshError => {
                            localStorage.clear();
                            return throwError(() => new Error('Session expirée, impossible de la rafraîchir'));
                        })
                    );
                }
                return throwError(() => error);
            })
        );
    }
    return next(req);
}