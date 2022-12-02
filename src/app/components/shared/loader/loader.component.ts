import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/utils/shared.service';

/**
 * This component serves as main component to show the loader and it contains the logic to show loader or disable the loader
 *
 * @requires {@link SharedService}
 */
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  /**
   * This the status of the loader, by default it's false
   *
   * @type {boolean}
   */
  showLoader: boolean = false;
  constructor(private sharedService: SharedService) {}

  /**
   * This method is one of the lifecycle hooks for the AppComponent, it is called in the beginning of the component.
   * This method subscribes to showLoader, i.e it checks if some method or component updates the value of showLoader, it updates the status of showing loader immidiately.
   *
   * @returns {void} it returns nothing
   */
  ngOnInit(): void {
    this.sharedService.showLoader.subscribe((status: boolean) => {
      this.showLoader = status;
    });
  }
}
