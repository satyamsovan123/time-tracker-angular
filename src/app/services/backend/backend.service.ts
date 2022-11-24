import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Signup } from 'src/app/models/signup.model';
import {
  API_CONSTANTS,
  REQUEST_RESPONSE_BODY_HEADER_CONSTANTS,
} from 'src/app/constants/backend.constant';
import { environment } from 'src/environments/environment';
import { Signin } from 'src/app/models/signin.model';
import { LoggerService } from '../utils/logger.service';
import { Observable } from 'rxjs';

/**
 * This service is used to connect with different backend APIs
 *
 * @requires {@link LoggerService}
 */
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(
    private httpClient: HttpClient,
    private loggerService: LoggerService
  ) {}

  /**
   * This is a POST method, and it sends the user details to backend for signing up
   *
   * @param {{Signup}} newUser is the object containing details for the new user, that would be sent to backend
   * @returns {{Observable<Object>}} an observable which will contain response from backend
   */
  signup(newUser: Signup): Observable<Object> {
    this.loggerService.log(newUser);
    return this.httpClient.post(
      environment.backendURL + API_CONSTANTS.SIGNUP,
      newUser,
      { withCredentials: true, observe: 'response' }
    );
  }

  /**
   * This is a POST method, and it sends the user details to backend for signing in
   *
   * @param {{Signup}} user is the object containing email and password of the user, that would be sent to backend
   * @returns {{Observable<Object>}} an observable which will contain response from backend
   */
  signin(user: Signin): Observable<Object> {
    this.loggerService.log(user);
    return this.httpClient.post(
      environment.backendURL + API_CONSTANTS.SIGNIN,
      user,
      { withCredentials: true, observe: 'response' }
    );
  }
}
