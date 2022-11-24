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
import { LoggerService } from '../utils/logger.service';
import { SharedService } from '../utils/shared.service';

/**
 * This service is used to intercept each HTTP request and the add authorization details and then send the request
 *
 * @requires {@link JwtService}
 * @requires {@link SharedService}
 * @requires {@link LoggerService}
 *
 */
@Injectable({
  providedIn: 'root',
})
export class InterceptorService {
  constructor(
    private router: Router,
    private loggerService: LoggerService,
    private sharedService: SharedService
  ) {}

  /**
   *
   * @param {{HttpRequest<any>}} req  is the HTTP request that is being made from client
   * @param {{HttpHandler}} next is the next function to be called i.e. this function continues the HTTP request, after authorization token is added
   * @returns
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    /**
     * Credentials is set to true, as sometimes, frontend and backend needs to send authorization related information, and the name for the custom header request is "access_token"
     */
    req = req.clone({
      withCredentials: true,
      setHeaders: {
        access_token: this.sharedService.getTokenFromLocalStorage(),
      },
    });
    return next.handle(req);
  }
}
