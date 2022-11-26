import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import {
  BACKEND_ACTION_CONSTANTS,
  REQUEST_RESPONSE_BODY_HEADER_CONSTANTS,
} from 'src/app/constants/backend.constant';

/**
 * This service is used to get and set the shared variables (observables mostly), across the module
 *
 * @requires {@link JwtService}
 */
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private router: Router, private toastrService: ToastrService) {}
  /**
   * This observable holds the current style of the background
   *
   * @type {Observable<string>}
   */
  currentStyle: ReplaySubject<string> = new ReplaySubject();

  /**
   * This observable holds the current value of the token set in local storage
   *
   * @type {Observable<string>}
   */
  currentToken: BehaviorSubject<string> = new BehaviorSubject(
    localStorage.getItem(REQUEST_RESPONSE_BODY_HEADER_CONSTANTS.ACCESS_TOKEN) ||
      ''
  );

  /**
   * This observable holds the current value of the email set in local storage
   *
   * @type {Observable<string>}
   */
  currentEmail: BehaviorSubject<string> = new BehaviorSubject(
    localStorage.getItem(REQUEST_RESPONSE_BODY_HEADER_CONSTANTS.EMAIL) || ''
  );

  /**
   * This observable holds the value to check if we need to show the loader or not
   *
   * @type {Observable<boolean>}
   */
  showLoader: ReplaySubject<boolean> = new ReplaySubject();

  /**
   * This method updates the current style, i.e. pushes a new value to the stream
   *
   * @param {{string}} style is the string that is updated, which is then received by all the subscribers
   * @returns {void} it returns nothing
   */
  updateStyle(style: string): void {
    this.currentStyle.next(style);
  }

  /**
   * This method updates the current status to show or disable loader, i.e. pushes a new value to the stream
   *
   * @param {{boolean}} status is the boolean that is updated, which is then received by all the subscribers
   * @returns {void} it returns nothing
   */
  updateLoaderStatus(status: boolean): void {
    this.showLoader.next(status);
  }

  /**
   * This method removes the token and email from local storage
   *
   * @returns {void} - it returns nothing
   */
  removeTokenFromLocalStorage(): void {
    localStorage.removeItem(
      REQUEST_RESPONSE_BODY_HEADER_CONSTANTS.ACCESS_TOKEN
    );

    localStorage.removeItem(REQUEST_RESPONSE_BODY_HEADER_CONSTANTS.EMAIL);
  }

  /**
   * This method gets the JWT token stored in the local storage
   *
   * @returns {string}
   */
  getTokenFromLocalStorage(): string {
    return (
      localStorage.getItem(
        REQUEST_RESPONSE_BODY_HEADER_CONSTANTS.ACCESS_TOKEN
      ) || ''
    );
  }

  /**
   * This method updates the current token to show or disable some elements in the navigation and it's also used by admin-guard service, i.e. pushes a new value to the stream
   * @param {{string}} token is the token that is updated, which is then received by all the subscribers
   * @returns {void} it returns nothing
   */
  updateToken(token: string): void {
    this.currentToken.next(token);
  }

  /**
   * This method updates the current email to show or disable some elements in the navigation and it's also used by admin-guard service, i.e. pushes a new value to the stream
   * @param {{string}} email is the email that is updated, which is then received by all the subscribers
   * @returns {void} it returns nothing
   */
  updateEmail(email: string): void {
    this.currentEmail.next(email);
  }

  /**
   * This method is called when user clicks on the sign out button, it removes the variables from local storage
   *
   * @returns {void} it returns nothing
   */
  signOut(): void {
    this.removeTokenFromLocalStorage();

    /**
     * Setting the updateToken to empty, this is done to hide the navbar elements that are require authentication,
     * navigating to sign in page thereafter
     */
    this.updateToken('');
    this.router.navigateByUrl('/signin');

    /**
     * Showing a success toastr with message a static success message
     */
    this.toastrService.success(BACKEND_ACTION_CONSTANTS.SIGNOUT_SUCCESSFUL);
  }
}
