import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  API_CONSTANTS,
  REQUEST_RESPONSE_BODY_HEADER_CONSTANTS,
} from 'src/app/constants/backend.constant';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(
      localStorage.getItem(REQUEST_RESPONSE_BODY_HEADER_CONSTANTS.ACCESS_TOKEN)
    );

    req = req.clone({
      withCredentials: true,
      setHeaders: {
        access_token:
          localStorage.getItem(
            REQUEST_RESPONSE_BODY_HEADER_CONSTANTS.ACCESS_TOKEN
          ) || '',
      },
    });
    return next.handle(req);
  }
}
