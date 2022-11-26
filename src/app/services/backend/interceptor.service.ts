import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';

import { LoggerService } from '../utils/logger.service';
import { SharedService } from '../utils/shared.service';
import { JwtService } from '../utils/jwt.service';
import { ToastrService } from 'ngx-toastr';

/**
 * This service is used to intercept each HTTP request and the add authorization details and then continue further to send the request
 *
 * @requires {@link JwtService}
 * @requires {@link SharedService}
 * @requires {@link JwtService}
 * @requires {@link ToastrService}
 * @requires {@link LoggerService}
 */
@Injectable({
  providedIn: 'root',
})
export class InterceptorService {
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private jwtService: JwtService
  ) {}

  /**
   *
   * @param {{HttpRequest<any>}} req  is the HTTP request that is being made from client
   * @param {{HttpHandler}} next is the next function to be called i.e. this function continues the HTTP request, after authorization token is added
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    /**
     * Checking if the user doesn't have a valid access_token, before every API call, then sending user to signin page
     * This is done in order to handle the scenario, where user manually deletes the auth cookie
     */
    const isValidTokenPresent = this.jwtService.validateJWT(
      this.sharedService.getTokenFromLocalStorage()
    );
    if (!isValidTokenPresent) {
      this.router.navigateByUrl('/signin');
    }
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
