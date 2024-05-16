import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from './services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.userService.getToken();
    console.log('Token:', token);
  console.log('Request URL:', request.url);
  console.log('Request Method:', request.method);


    // Exclude authorization header for requests to the mail service
    if (request.url.includes('/api/v4/sendEmail')) {
      return next.handle(request);
    }

    // Clone the request and add the authorization header if a token is available
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Pass the cloned request to the next interceptor in the chain
    return next.handle(request);
  }
}