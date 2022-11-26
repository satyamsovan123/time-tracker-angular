import { Component, OnInit } from '@angular/core';
import { COMMON_CONSTANTS } from 'src/app/constants/common.constant';
import { SharedService } from 'src/app/services/utils/shared.service';

/**
 * This component serves as main component where users sees the error message
 *
 * @requires {@link SharedService}
 */
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  /**
   * This the error message that is shown to the user in full screen, this is initialized with a default error message
   *
   * @type {string}
   */
  errorMessage: string = COMMON_CONSTANTS.GENERIC_ERROR_MESSAGE;
  constructor(private sharedService: SharedService) {}

  /**
   * This method is one of the lifecycle hooks for the AppComponent, it is called in the beginning of the component.
   * This method gets the error message to show them to user. It also updates the current style to light, as it uses a light background, so that the updated style would be captured by the navigation component to change the color of navigation component.
   *
   * @returns {void} it returns nothing
   */
  ngOnInit(): void {
    this.sharedService.updateStyle('light');
    this.errorMessage = COMMON_CONSTANTS.PAGE_DOESNT_EXIST;
  }
}
