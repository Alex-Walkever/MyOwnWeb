import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { SecurityService } from "../../api/services/security.service";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn) => {
    const securityService = inject(SecurityService);
    const token = securityService.getToken();

    if (token) {
        req = req.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    return next(req);
}
