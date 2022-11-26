import { Component, OnInit } from '@angular/core';
import { FORM_CONSTANTS } from 'src/app/constants/common.constant';
import { LoggerService } from 'src/app/services/utils/logger.service';
import { SharedService } from 'src/app/services/utils/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/services/backend/backend.service';
import { Signup } from '../../models/signup.model';
import { finalize } from 'rxjs/operators';
import {
  BACKEND_ACTION_CONSTANTS,
  REQUEST_RESPONSE_BODY_HEADER_CONSTANTS,
} from 'src/app/constants/backend.constant';
import { BackendResponse } from 'src/app/models/backendResponse.model';
import { JwtService } from 'src/app/services/utils/jwt.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

/**
 * This component serves as the base component to be shown for signup component, it contains the logic for signing up
 *
 * @requires {@link SharedService}
 * @requires {@link BackendService}
 * @requires {@link ToastrService}
 * @requires {@link LoggerService}
 *
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  /**
   * This is the signup form
   *
   * @type {FormGroup}
   */
  signupForm: any;

  /**
   * This variable is true if the form is submitted atlesast once, since the component's start. By default it is false
   *
   * @type {boolean}
   */
  submitted: boolean = false;

  /**
   * This variable holds the error message for invalid email
   *
   * @type {string}
   */
  invalidEmail: string = FORM_CONSTANTS.INVALID_EMAIL;

  /**
   * This variable holds the error message for invalid password
   *
   * @type {string}
   */
  invalidPassword: string = FORM_CONSTANTS.INVALID_PASSWORD;

  /**
   * This variable holds the error message for invalid first name
   *
   * @type {string}
   */
  invalidFirstName: string = FORM_CONSTANTS.INVALID_FIRSTNAME;

  /**
   * This variable holds the error message for invalid last name
   *
   * @type {string}
   */
  invalidLastName: string = FORM_CONSTANTS.INVALID_LASTNAME;

  /**
   * This variable holds true if the environment is production
   * it's used for debugging purpose
   *
   * @type {boolean}
   */
  productionEnvironment: boolean = environment.production;

  constructor(
    private sharedService: SharedService,
    private loggerService: LoggerService,
    private toastrService: ToastrService,
    private backendService: BackendService,
    private jwtService: JwtService,
    private router: Router
  ) {}

  /**
   * This method is one of the lifecycle hooks for the AppComponent, it is called in the beginning.
   * On the load of the component, the signup form is created.
   * It also updates the current style to light, as it uses a light background, so that the updated style would be captured by the navigation component to change the color of navigation component.
   *
   * @returns {void} it returns nothing
   */
  ngOnInit(): void {
    this.sharedService.updateStyle('light');
    this.createForm();
  }

  /**
   * This method creates the signup form, and the validators with default values as 'null'
   *
   * @returns {void} it returns nothing
   */
  createForm(): void {
    this.signupForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.nullValidator,
      ]),
    });
  }

  /**
   * This method checks the requirement for the provided control (input)
   *
   * @param {string} control is the name of the control (i.e. the input)
   * @returns {boolean} it returns the requirement for the input, if it returns true, then a (*) asterisks is shown against the input
   */
  checkRequirement(control: string): boolean {
    /**
     * Checking if the control i.e. input has 'required' in the validations, then it returns true, i.e. the control is required, else it's not required
     */
    if (control)
      if (this.signupForm.controls[control].validator(control))
        return this.signupForm.controls[control].validator(control)['required'];
    return false;
  }

  /**
   * This method validates the entire form
   *
   * @returns {boolean} it returns true if form is valid, else it will return false
   */
  validateForm(): boolean {
    /**
     * This is the status of validation of the form, by default it's false
     *
     * @type {boolean}
     */
    let validationStatus: boolean = false;
    /**
     * Checking if the form status is "INVALID", then calling the toastr service and showing the error message, else setting the validation value as true, and then returning the value
     */
    if (this.signupForm.status === FORM_CONSTANTS.INVALID_FORM_STATUS) {
      this.toastrService.error(FORM_CONSTANTS.INVALID_FORM);
    } else {
      validationStatus = true;
    }
    return validationStatus;
  }

  /**
   * This method is called when user clicks on submit button, it calls the {@link validate()} function to validate and then it calls the backend service
   *
   * @returns {void} it returns nothing
   */
  onSubmit(): void {
    /**
     * Setting the loader status to true, as it might take some time to validate form, send and receive data from backend
     */
    this.sharedService.updateLoaderStatus(true);

    /**
     * Setting submitted status to true
     */
    this.submitted = true;

    /**
     * This is done for responsiveness
     */
    window.scrollTo(0, 0);

    /**
     * This is the status of validation status that is received from validateForm method
     *
     * @type {boolean}
     * @const
     */
    const validationStatus: boolean = this.validateForm();

    /**
     * Checking if the form is invalid, then stopping the loader, by updating the loader status to false, and returning
     */
    if (!validationStatus) {
      this.sharedService.updateLoaderStatus(false);
      return;
    }

    /**
     * This is the user variable that is made using the Signup model
     * Changing the first letters of the names to capital
     *
     * @type {Signup}
     * @const
     */
    const newUser: Signup = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      firstName: this.signupForm.value.firstName
        .toLowerCase()
        .replace(' ', '')
        .replace(/\b\w/g, (firstName: string) => firstName.toUpperCase()),
      lastName: this.signupForm.value.lastName
        .toLowerCase()
        .replace(' ', '')
        .replace(/\b\w/g, (lastName: string) => lastName.toUpperCase()),
    };

    /**
     * Sending the user data to backend for authentication
     */
    this.backendService
      .signup(newUser)
      .pipe(
        finalize(() => {
          /**
           * Setting the loader status to false, on succesful completion of backend call or on on unsuccesful completion of backend call
           */
          this.sharedService.updateLoaderStatus(false);
        })
      )
      .subscribe({
        /**
         * This method is called on successful completion of the request made to backend
         *
         * @param {any} response is the response from backend
         */
        next: (response: any) => {
          /**
           * This is the response from backend that is mapped using the BackendResponse model
           *
           * @type {BackendResponse}
           * @const
           */
          const backendResponse: BackendResponse = new BackendResponse(
            response.body
          );

          /**
           * Showing a success toastr with message either from backend or a static success message
           */
          this.toastrService.success(
            backendResponse.message ||
              BACKEND_ACTION_CONSTANTS.SIGNUP_SUCCESSFUL
          );

          /**
           * This is the token from backend that is received after successful authentication
           *
           * @type {string}
           * @const
           */
          const accessToken: string = response.headers.get(
            REQUEST_RESPONSE_BODY_HEADER_CONSTANTS.ACCESS_TOKEN
          );

          /**
           * Removing the old access_token, saving the access_token in local storage
           * Updating the access token value and email
           * Adding the email to local storage, for further use
           * Redirecting user to current tasks page
           */
          this.sharedService.removeTokenFromLocalStorage();

          this.sharedService.updateToken(accessToken);
          localStorage.setItem(
            REQUEST_RESPONSE_BODY_HEADER_CONSTANTS.ACCESS_TOKEN,
            accessToken
          );
          this.sharedService.updateEmail(newUser.email);

          localStorage.setItem(
            REQUEST_RESPONSE_BODY_HEADER_CONSTANTS.EMAIL,
            newUser.email
          );

          this.router.navigateByUrl('/dashboard');
        },
        /**
         * This method is called if the request made to backend was not successful
         *
         * @param {any} response is the response from backend
         */
        error: (response: any) => {
          /**
           * This is the response from backend that is mapped using the BackendResponse model
           *
           * @type {BackendResponse}
           * @const
           */
          const backendResponse: BackendResponse = new BackendResponse(
            response.error
          );

          /**
           * Showing a error toastr with message either from backend or a static error message
           */
          this.loggerService.log(backendResponse);
          this.toastrService.error(
            backendResponse.message ||
              BACKEND_ACTION_CONSTANTS.SIGNUP_UNSUCCESSFUL
          );
        },
        complete: () => {},
      });
  }
}
