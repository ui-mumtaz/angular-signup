import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Modify or log the outgoing request
    const modifiedReq = req.clone({
      withCredentials: true
    });

    return next.handle(modifiedReq);
  }
}


/* Observable<HttpEvent<any>> {
  //console.log(req);

  // Modify or log the outgoing request
  const modifiedReq = req.clone({
    withCredentials: true
  });

  //return next.handle(modifiedReq);
  return next.handle(modifiedReq).pipe(
    filter(val => val.type === HttpEventType.Sent),
    tap(val => {
      //console.log('modifiedReq', val);
      if (val.type === HttpEventType.Sent) {
        console.log('Request was sent to server');
      }

      if (val.type === HttpEventType.Response) {
        console.log('Got a response from the API ', val);
      }
    })
    tap(val => {
      console.log('sent the request...');

    })
  );
} */