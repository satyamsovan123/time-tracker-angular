import { Component, OnInit } from '@angular/core';
import {
  COMMON_CONSTANTS,
  FORM_CONSTANTS,
} from 'src/app/constants/common.constant';
import { LoggerService } from 'src/app/services/utils/logger.service';
import { SharedService } from 'src/app/services/utils/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/services/backend/backend.service';
import { Signup } from '../../models/signup.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: any;
  submitted: boolean = false;
  invalidEmail: string = FORM_CONSTANTS.INVALID_EMAIL;
  invalidPassword: string = FORM_CONSTANTS.INVALID_PASSWORD;
  invalidFirstName: string = FORM_CONSTANTS.INVALID_FIRSTNAME;
  invalidLastName: string = FORM_CONSTANTS.INVALID_LASTNAME;

  constructor(
    private sharedService: SharedService,
    private loggerService: LoggerService,
    private toastrService: ToastrService,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.sharedService.updateStyle('light');

    this.createForm();
  }

  createForm() {
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
        Validators.minLength(6),
        Validators.nullValidator,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.nullValidator,
      ]),
    });
  }

  checkRequirement(control: string) {
    if (control)
      if (this.signupForm.controls[control].validator(control))
        return this.signupForm.controls[control].validator(control)['required'];
  }

  handleValidation(): boolean {
    let validationStatus: boolean = false;
    if (this.signupForm.status === FORM_CONSTANTS.INVALID_FORM_STATUS) {
      this.toastrService.error(FORM_CONSTANTS.INVALID_FIELDS_IN_FORM);
    } else {
      validationStatus = true;
    }
    return validationStatus;
  }

  handleSubmitForm() {
    this.sharedService.updateLoaderStatus(true);
    this.submitted = true;
    window.scrollTo(0, 0);
    const validationStatus: boolean = this.handleValidation();

    if (!validationStatus) {
      this.sharedService.updateLoaderStatus(false);
      // return;
    }
    const newUser: Signup = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
    };
    this.backendService
      .signup(newUser)
      .pipe(
        finalize(() => {
          console.log('after everything');
        })
      )
      .subscribe({
        next: (result) => {
          this.loggerService.log(result);
          this.sharedService.updateLoaderStatus(false);
          this.toastrService.success(COMMON_CONSTANTS.SIGNUP_SUCCESSFUL);
        },
        error: (error) => {
          this.loggerService.log(error);
          this.sharedService.updateLoaderStatus(false);
          this.toastrService.success(COMMON_CONSTANTS.SIGNUP_SUCCESSFUL);
        },
        complete: () => {
          console.log('????');
        },
      });
  }
}
