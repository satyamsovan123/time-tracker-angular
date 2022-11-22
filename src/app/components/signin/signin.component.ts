import { Component, OnInit } from '@angular/core';
import { FORM_CONSTANTS } from 'src/app/constants/common.constant';
import { LoggerService } from 'src/app/services/utils/logger.service';
import { SharedService } from 'src/app/services/utils/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/services/backend/backend.service';
import { finalize } from 'rxjs/operators';
import { BACKEND_ACTION_CONSTANTS } from 'src/app/constants/backend.constant';
import { BackendResponse } from 'src/app/models/backendResponse.model';
import { Signin } from 'src/app/models/signin.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm: any;
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

  createForm(): void {
    this.signinForm = new FormGroup({
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

  checkRequirement(control: string): boolean {
    if (control)
      if (this.signinForm.controls[control].validator(control))
        return this.signinForm.controls[control].validator(control)['required'];
    return false;
  }

  validate(): boolean {
    let validationStatus: boolean = false;
    if (this.signinForm.status === FORM_CONSTANTS.INVALID_FORM_STATUS) {
      this.toastrService.error(FORM_CONSTANTS.INVALID_FIELDS_IN_FORM);
    } else {
      validationStatus = true;
    }
    return validationStatus;
  }

  onSubmit(): void {
    this.sharedService.updateLoaderStatus(true);
    this.submitted = true;
    window.scrollTo(0, 0);
    const validationStatus: boolean = this.validate();

    if (!validationStatus) {
      this.sharedService.updateLoaderStatus(false);
      return;
    }
    const user: Signin = {
      email: this.signinForm.value.email,
      password: this.signinForm.value.password,
    };
    this.backendService
      .signin(user)
      .pipe(
        finalize(() => {
          this.sharedService.updateLoaderStatus(false);
        })
      )
      .subscribe({
        next: (response: any) => {
          const backendResponse = new BackendResponse(response);
          this.loggerService.log(backendResponse);
          this.toastrService.success(
            backendResponse.message ||
              BACKEND_ACTION_CONSTANTS.SIGNUP_SUCCESSFUL
          );
        },
        error: (response) => {
          const backendResponse = new BackendResponse(response.error);
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
