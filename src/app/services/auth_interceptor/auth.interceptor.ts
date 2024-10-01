import { HttpInterceptorFn} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;
  const excludedPatterns = [/\/api\/auth\//];

  const isExcluded = excludedPatterns.some(pattern => pattern.test(req.url));
  if (isExcluded) {
    return next(req);
  }
  
  const token = localStorage.getItem('userToken');
  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`  // Attach token in the Authorization header
    }
  });
debugger;
  console.log('Request with Authorization:', cloneRequest.headers.get('Authorization'));
  return next(cloneRequest).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Handle unauthorized errors, e.g., redirect to login page
        console.error('Unauthorized request:', error);
      } else if (error.status === 403) {
        // Handle forbidden errors if necessary
        console.error('Forbidden request:', error);
      } else {
        // Handle other types of errors
        console.error('HTTP error:', error);
      }

      // Forward the error to the caller
      return throwError(() => new Error(error.message));
    })
  );
};


