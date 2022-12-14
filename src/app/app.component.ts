import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
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
export class AppComponent implements OnInit, AfterContentChecked {
  constructor(
    private sharedService: SharedService,
    private cdRef: ChangeDetectorRef
  ) {}

  /**
   * This method is one of the lifecycle hooks for the AppComponent, it is called in the after the default change detector has completed checking all the content.
   * This is done in order to check the change in the loader status correctly
   *
   * @returns {void} it returns nothing
   */
  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }

  /**
   * This is the title for the application
   *
   * @type {string}
   */
  title: string = 'time-tracker';
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
    /**
     * Easter egg: Hello, are you lost?
     */
    console.log('Hello, we thank you for using Time Tracker!');
    this.sharedService.showLoader.subscribe((status: boolean) => {
      this.disableBackground = status;
    });
  }
}
