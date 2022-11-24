import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../services/utils/shared.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  /**
   * This is the variable that holds the status for user authentication
   */
  isAuthenticated: boolean = false;

  constructor(private sharedService: SharedService, private router: Router) {}
  async canActivate(): Promise<boolean> {
    return true;

    this.isAuthenticated = await this.sharedService.getIsAuthenticated();
    if (!this.isAuthenticated) {
      this.router.navigate(['signin']);
      return false;
    }
    return true;
  }
}
