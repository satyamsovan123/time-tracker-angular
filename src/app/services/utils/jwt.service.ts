import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { REQUEST_RESPONSE_BODY_HEADER_CONSTANTS } from 'src/app/constants/backend.constant';
import { SharedService } from './shared.service';
const helper = new JwtHelperService();

/**
 * This service is used to validate JWT and expiration date for the JWT stored in local storage
 */
@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private router: Router, private sharedService: SharedService) {}

  /**
   * This method helps to verify the JWT and check if JWT is expired
   *
   * @params is the provided token
   * @returns {boolean} it returns true if JWT is valid and not expired
   */
  validateJWT(token: string): boolean {
    /**
     * This variable holds the status of the JWT
     *
     * @type {boolean}
     */
    let status: boolean = false;

    /**
     * Checking if no token is provided, then returning false
     */
    if (!token) {
      return status;
    }
    /**
     * Checking if token is not expired, then updating the status to true, else removing the expired token from local storage (by calling another method), i.e. forcing user to sign in again
     */
    if (!helper.isTokenExpired(token)) {
      status = true;
    } else {
      this.sharedService.updateToken('');
      localStorage.removeItem(
        REQUEST_RESPONSE_BODY_HEADER_CONSTANTS.ACCESS_TOKEN
      );
      localStorage.removeItem(REQUEST_RESPONSE_BODY_HEADER_CONSTANTS.EMAIL);

      this.sharedService.updateToken('');
      this.router.navigateByUrl('/signin');
    }
    return status;
  }
}
