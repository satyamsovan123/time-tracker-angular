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
   * @param {{Signin}} user is the object containing email and password of the user, that would be sent to backend
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

  /**
   * This is a PUT method, and it sends the timing details to backend when user updates the timesheet for the current day
   *
   * @param {{Timings}} timings is the object containing email and updated time sheet of the user, that would be sent to backend
   * @returns {{Observable<Object>}} an observable which will contain response from backend
   */
  saveTimings(timings: any): Observable<Object> {
    this.loggerService.log(timings);
    return this.httpClient.put(
      environment.backendURL + API_CONSTANTS.TASK,
      timings
    );
  }

  /**
   * This is a DELETE method, and it sends the timing details to backend when user tries to delete the timing from the sheet
   * @param {{timingId;}} timingId is the object containing email and current time to be deleted by the user, that would be sent to backend
   * @returns {{Observable<Object>();}} an observable which will contain response from backend
   */
  deleteTiming(timingId: string): Observable<Object> {
    this.loggerService.log(timingId);
    return this.httpClient.delete(
      environment.backendURL + API_CONSTANTS.TASK
      // timingId
    );
  }
}
