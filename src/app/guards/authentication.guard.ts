import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import {
  BACKEND_ACTION_CONSTANTS,
  REQUEST_RESPONSE_BODY_HEADER_CONSTANTS,
} from '../constants/backend.constant';
import { COMMON_CONSTANTS } from '../constants/common.constant';
import { JwtService } from '../services/utils/jwt.service';
import { SharedService } from '../services/utils/shared.service';

/**
 * This is the service to guard pages that require authentication (i.e /dashboard, /tasks)
 *
 * @requires {@link SharedService}
 * @requires {@link JwtService}
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  /**
   * This is the boolean value for signed in, default value is false, this is requried to enable or disable some navigation menu items
   *
   * @type {boolean}
   */
  currentTokenStatus: boolean = false;

  /**
   * This is the variable that holds the status for user authentication i.e. if the user is signed in then a valid token must be present in the local storage, by default it's false
   *
   * @type {boolean}
   */
  isValidTokenPresentInLocalStorage: boolean = false;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private jwtService: JwtService,
    private toastrService: ToastrService
  ) {}
  canActivate(): any {
    /**
     * Checking if the current JWT token in local storage is not valid, updating token observable, redirecting user to signin then returning false
     * This is done in order to handle the scenario, where user manually deletes the auth cookie
     * Showing a success toastr with message a static success message
     */
    if (
      !this.jwtService.validateJWT(
        localStorage.getItem(
          REQUEST_RESPONSE_BODY_HEADER_CONSTANTS.ACCESS_TOKEN
        ) || ''
      )
    ) {
      this.sharedService.updateToken('');

      this.toastrService.info(COMMON_CONSTANTS.COOKIE_CLEARED);
      return false;
    }

    /**
     * Checking if the token is valid, then returing true, else returning false
     */
    this.sharedService.currentToken.subscribe((token) => {
      this.currentTokenStatus = this.jwtService.validateJWT(token);

      if (this.currentTokenStatus) {
        return true;
      }
      this.router.navigateByUrl('/signin');
      return false;
    });
  }
}
