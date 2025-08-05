import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { catchError, from, map, Observable, of, switchMap, throwError } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
import { inject } from "@angular/core";
import { PaymentServiceService } from "../../services/payment/payment-service.service";
import { NotificationService } from "../../../shared/services/notification/notification.service";
import { Router } from "@angular/router";
import { CustomErrorResponse } from "../../../shared/models/interfaces/customErrorResponse";

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  const excludedPatterns = [/\/api\/auth\//];
  const isExcluded = excludedPatterns.some(pattern => pattern.test(req.url));

  const authService = inject(AuthService);
  const paymentService = inject(PaymentServiceService);
  const notifier = inject(NotificationService);
  const router = inject(Router);

  const token = authService.getToken();
  let clonedReq = req;

  if (!isExcluded && token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const customError = error.error as CustomErrorResponse;


      if (error.status === HttpStatusCode.Unauthorized) {
        notifier.show('Your session has expired. Please log in again.', 'error');
        router.navigate(['/sign-in']);
        return new Observable<HttpEvent<unknown>>(); // Complete the observable chain
      }

      // ❌ Forbidden due to unpaid dues — Custom API response
      // Check for 403 AND your specific custom code
      if (
        error.status === HttpStatusCode.Forbidden &&
        customError.code === 'DuesNotPaid' &&
        customError.paymentData
      ) {
        //  const paymentData = customError.paymentData;
        notifier.show(customError.message, 'warning'); 
        const currentToken = authService.getToken(); // Use the existing token

       debugger;

        if (!currentToken) {
          notifier.show('Could not find authentication token for payment.', 'error');
          router.navigate(['/sign-in']);
          return throwError(() => new Error('No token for payment initiation'));
        }

          router.navigate(['/access-denied'], {
            queryParams: {
            serviceId: customError.paymentData.serviceId,
            paymentType: customError.paymentData.paymentType
          }
        });
          return new Observable<HttpEvent<unknown>>();
      }

      if (error.status === HttpStatusCode.NotFound) {
          notifier.show('Resourses not found, try later.', 'error');
          return throwError(() => error);
      }

      // Other errors: just rethrow
      notifier.show('An unexpected error occurred.', 'error'); // Generic error message for others
      return throwError(() => error);
    })
  );
};