import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private jwtService: JwtService,
    private toastrService: ToastrService
  ) {}
  canActivate(): any {
    this.sharedService.currentToken.subscribe((token) => {
      this.currentTokenStatus = this.jwtService.validateJWT(token);
      /**
       * Checking if the token is valid, then returing true, else navigating to /signin page and returning false
       */
      if (this.currentTokenStatus) {
        return true;
      }
      this.router.navigateByUrl('/signin');
      return false;
    });
  }
}
