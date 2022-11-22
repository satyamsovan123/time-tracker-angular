import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/services/utils/logger.service';
import { SharedService } from 'src/app/services/utils/shared.service';

/**
 * This component serves as main component to show the navigation and it contains the logic to change the color of the navigation bar
 *
 * @requires {@link SharedService}
 * @requires {@link LoggerService}
 *
 */
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private loggerService: LoggerService
  ) {}

  /**
   * This the default color theme
   *
   * @type {string}
   */
  currentBackground: string = 'light';

  /**
   * This method is one of the lifecycle hooks for the AppComponent, it is called in the beginning of the component.
   * This method subscribes to the current theme, i.e it checks the color theme of the current component in the view and adjusts the color of the text in the navigation bar.
   *
   * @returns {void} it returns nothing
   */
  ngOnInit(): void {
    this.sharedService.currentStyle.subscribe((currentBackground) => {
      this.loggerService.log(currentBackground);
      this.currentBackground = currentBackground;
    });
  }
}
