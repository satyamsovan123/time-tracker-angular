import { Component, OnInit } from '@angular/core';
import { SharedService } from './services/utils/shared.service';

/**
 * This component serves as the base component to be shown i.e this is the component that is bootstrapped
 *
 * @requires {@link SharedService}
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private sharedService: SharedService) {}
  title = 'time-tracker';

  /**
   * This the variable that holds the status to either enable or disable background elements
   *
   * @type {boolean}
   */
  disableBackground: boolean = false;

  /**
   * This method is one of the lifecycle hooks for the AppComponent, it is called in the beginning.
   * This method subscribes to the {@link showLoader} observable and it gets the updated status to either show the background or disable the background (while showing the loader).
   *
   * @returns {void} it returns nothing
   */
  ngOnInit(): void {
    this.sharedService.showLoader.subscribe((status: boolean) => {
      this.disableBackground = status;
    });
  }
}
