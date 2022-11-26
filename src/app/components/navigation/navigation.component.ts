import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/utils/shared.service';
import { JwtService } from 'src/app/services/utils/jwt.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

/**
 * This component serves as main component to show the navigation and it contains the logic to change the color of the navigation bar
 *
 * @requires {@link SharedService}
 * @requires {@link JwtService}
 */
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private jwtService: JwtService
  ) {}

  /**
   * This the default color theme
   *
   * @type {string}
   */
  currentBackground: string = 'light';

  /**
   * This is the boolean value for signed in, default value is false, this is requried to enable or disable some navigation menu items
   *
   * @type {boolean}
   */
  currentTokenStatus: boolean = false;

  /**
   * This method is one of the lifecycle hooks for the AppComponent, it is called in the beginning of the component.
   * This method subscribes to the current theme, i.e it checks the color theme of the current component in the view and adjusts the color of the text in the navigation bar.
   *
   * @returns {void} it returns nothing
   */
  ngOnInit(): void {
    this.sharedService.currentStyle.subscribe((currentBackground) => {
      this.currentBackground = currentBackground;
    });

    /**
     * Subscribing to the authentication status observable, to check for validity of JWT token in local storage
     * This is requied to show those navigation links on authentication
     */
    this.sharedService.currentToken.subscribe((token) => {
      this.currentTokenStatus = this.jwtService.validateJWT(token);
    });
  }

  /**
   * This method is called when user clicks on the sign out button, it calls a shared service for the task
   *
   * @returns {void} it returns nothing
   */
  signOut(): void {
    this.sharedService.signOut();
  }
}
