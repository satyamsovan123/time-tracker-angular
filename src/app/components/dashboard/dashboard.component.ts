import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { SharedService } from 'src/app/services/utils/shared.service';
import { LoggerService } from 'src/app/services/utils/logger.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { finalize } from 'rxjs/operators';
import { BackendResponse } from 'src/app/models/backendResponse.model';
import { ToastrService } from 'ngx-toastr';
import { BACKEND_ACTION_CONSTANTS } from 'src/app/constants/backend.constant';
import { COMMON_CONSTANTS } from 'src/app/constants/common.constant';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DashboardChartConfiguration } from 'src/app/configs/chart.config';

/**
 * This component serves as main component when user is in the /dashboard route. This component handles the logic for showing the user profile, deleting the insights and deleting the user accound
 *
 * @requires {@link SharedService}
 * @requires {@link BackendService}
 * @requires {@link LoggerService}
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private loggerService: LoggerService,
    private backendService: BackendService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.onResize();
  }

  /**
   * Getting the element tagged with chart i.e the chart canvas
   */
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  /**
   * This is the height of the screen, and default value is 0
   *
   * @type {number}
   */
  screenHeight: number = 0;

  /**
   * This is the width of the screen, and default value is 0
   *
   * @type {number}
   */
  screenWidth: number = 0;

  /**
   * This is the confirmaion message shown to the user while deleting the user account
   *
   * @type {string}
   */
  deleteConfirmationMessage: string = '';

  /**
   * This is the insights array where the user's data is stored
   *
   * @type {[]}
   */
  insights: any = [];

  /**
   * This is the name of the user
   *
   * @type {string}
   */
  currentName: string = '';

  /**
   * This is the configuration required for chart-js library. It is imported from config file
   *
   * @type {{ChartConfiguration}}
   */
  public chartOptions: ChartConfiguration['options'] =
    DashboardChartConfiguration;

  /**
   * This is the type of the chart e.g bar/pie etc. We are using the bar chart.
   *
   * @type {{ChartConfiguration}}
   */
  public chartType: ChartType = 'bar';

  /**
   * This is the plugin for the chart
   *
   * @type {[]}
   */
  public chartPlugins: [any] = [DataLabelsPlugin];

  /**
   * This is the data that is used for representing the chart
   *
   * @type {ChartData}
   */
  public chartData: ChartData<'bar'> = {
    datasets: [],
  };

  /**
   * Listening to the 'resize' event on the entire page, and using that to either show or hide the x-axis label (Date) and y-axis label (Hours used)
   * This method is called automatically to listen while scrolling
   *
   * @returns {boolean} it returns false for mobile screens and true for desktop screens
   */
  @HostListener('window:resize', ['$event'])
  onResize(): boolean {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.loggerService.log([this.screenWidth, window.innerWidth]);

    /**
     * Checking if the screen width is less than 500 pixels, then it's mobile screen, and returning false, else it's a desktop screen and returning true
     */
    if (window.innerWidth < 500) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * This method is one of the lifecycle hooks for the AppComponent, it is called in the beginning of the component.
   * It also updates the current style to dark, as it uses a light background, so that the updated style would be captured by the navigation component to change the color of navigation component. It starts the loader as soon as this component comes to the view, as it needs to fetch user information in the background from backend
   *
   * @async
   * @returns {{Promise}} it returns nothing
   */
  async ngOnInit(): Promise<void> {
    /**
     *  Initializing the delete confirmation message
     */
    this.deleteConfirmationMessage =
      COMMON_CONSTANTS.DELETE_ACCOUNT_CONFIRMATION;
    this.sharedService.updateStyle('light');
    this.sharedService.updateLoaderStatus(true);

    /**
     * Scrolling to the top, on opening the component
     */
    window.scroll(0, 0);

    /**
     * To avoid any errors, this block of asynchronous code is placed in try catch block
     */
    try {
      /**
       * This is the response from the backend for getProfile, it contains the name, and current task for today's date for the signed in user.
       * This method waits for the operation to be completed.
       *
       * @type {any}
       * @const
       */
      const getProfileResult: any = await this.backendService.getProfile();

      /**
       * Updating the name of the current user
       *
       * @type {any}
       * @const
       */
      this.currentName =
        getProfileResult.data.firstName +
        ' ' +
        getProfileResult.data.lastName +
        '.';

      /**
       * This is the response from the backend for getInsights, it contains the insights i.e the history of data for total hours logged in and total hours used for a given date.
       * This method waits for the operation to be completed.
       *
       * @type {any}
       * @const
       */
      const getInsightsResult: any = await this.backendService.getInsights();
      this.insights = getInsightsResult.data;

      /**
       * Calling the {@link generateGraphData()} method to generate graph for the received user data
       */
      this.loggerService.log([getProfileResult, this.insights]);
      this.generateGraphData();

      /**
       * After everything is completed, the loader status is set to false, to allow user to interact
       */
      this.sharedService.updateLoaderStatus(false);
    } catch (response: any) {
      /**
       * Incase of any errors in the try block, a generic error message is returned to the user and error is logged to the console.
       * After everything is completed, the loader status is set to false, to allow user to interact, and showing a toastr with error message.
       */
      this.sharedService.updateLoaderStatus(false);

      this.toastrService.error(
        BACKEND_ACTION_CONSTANTS.UNABLE_TO_FETCH_PROFILE
      );
    }
  }

  /**
   * This method is called when user confirms to delete the account, it makes a call to backend service
   *
   * @returns {void} it returns nothing
   */
  deleteAccount(): void {
    /**
     * Updating the loader status to true, as it may take some time to communicate with backend
     */
    this.sharedService.updateLoaderStatus(true);

    this.backendService
      .deleteAccount()
      .pipe(
        finalize(() => {
          /**
           * Setting the loader status to false, on succesful completion of backend call or on on unsuccesful completion of backend call
           */
          this.sharedService.updateLoaderStatus(false);
        })
      )
      .subscribe({
        /**
         * This method is called on successful completion of the request made to backend
         *
         * @param {any} response is the response from backend
         */
        next: (response: any) => {
          /**
           * This is the response from backend that is mapped using the BackendResponse model
           *
           * @type {BackendResponse}
           * @const
           */
          const backendResponse: BackendResponse = new BackendResponse(
            response
          );

          /**
           * Showing a success toastr with message either from backend or a static success message.
           * Removing the current access token, and updating the observable and sending the user to signin page.
           */

          this.toastrService.success(
            backendResponse.message ||
              BACKEND_ACTION_CONSTANTS.ACCOUNT_DELETION_SUCCESSFUL
          );
          this.sharedService.removeTokenFromLocalStorage();
          this.sharedService.updateToken('');
          this.router.navigateByUrl('/signin');
        },
        /**
         * This method is called if the request made to backend was not successful
         *
         * @param {any} response is the response from backend
         */
        error: (response: any) => {
          /**
           * This is the response from backend that is mapped using the BackendResponse model
           *
           * @type {BackendResponse}
           * @const
           */
          const backendResponse: BackendResponse = new BackendResponse(
            response
          );

          /**
           * Showing a error toastr with message either from backend or a static error message
           */
          this.toastrService.error(
            backendResponse.message ||
              BACKEND_ACTION_CONSTANTS.ACCOUNT_DELETION_UNSUCCESSFUL
          );
        },
      });
  }

  /**
   * This method generates the graph for the recevied user data
   *
   * @returns {void} it returns nothing
   */
  generateGraphData(): void {
    /**
     * This is the data for y-axis i.e it contains the total hours utilized for the date
     *
     * @type {[] | any}
     * @const
     */
    const yAxisHoursData: [] | any = [];

    /**
     * This is the data for z-axis i.e it contains the dates
     *
     * @type {[] | any}
     * @const
     */
    const xAxisDateData: [] | any = [];

    /**
     * Looping over the received insights and extracting the x-axis and y-axis data and storing them
     */
    this.insights.forEach((insight: {} | any) => {
      xAxisDateData.push(this.convertStringToDate(insight.dateAdded));
      yAxisHoursData.push(insight.timeUsed);
    });

    /**
     * This is the updated data for the chart, created using the user data received from backend
     *
     * @type {[] | any}
     * @const
     */
    const data: ChartData<'bar'> = {
      labels: xAxisDateData,
      datasets: [
        {
          data: yAxisHoursData,
          label: 'Total hours logged',
          borderColor: '#ee7b39',
          backgroundColor: '#ee7b39',
          borderRadius: 5,
          maxBarThickness: 50,
          hoverBackgroundColor: '#ee7b39',
        },
      ],
    };
    this.chartData = data;
  }

  /**
   * This method converts the UTC dates received from backend and converts it to local time zone. It then formats it as a string with "DD/MM/YYYY" format.
   *
   * @param {any} timeInUTCString is the date in UTC format
   * @returns {string} it returns the date in string format
   */
  convertStringToDate(timeInUTCString: any): string {
    /**
     * Converting the UTC date into string with "DD/MM/YYYY" format
     *
     * @type {string}
     * @const
     */
    const localTime: string = moment
      .utc(timeInUTCString)
      .local()
      .format('DD/MM/YYYY');
    return localTime;
  }

  /**
   * This method is called when user clicks on the delete insight button
   *
   * @param {number} index is index of the insight that needs to be deleted, we need it to get the dateAdded property for the insights array
   * @returns {void} it returns nothing
   */
  deleteInsight(index: number): void {
    /**
     * Updating the loader status to true, as it may take some time to communicate with backend
     */
    this.sharedService.updateLoaderStatus(true);

    /**
     * Sending the dateAdded to backend for deleting the insight
     */
    this.backendService
      .deleteInsight(this.insights[index].dateAdded)
      .pipe(
        finalize(() => {
          /**
           * Setting the loader status to false, on succesful completion of backend call or on on unsuccesful completion of backend call
           */
          this.sharedService.updateLoaderStatus(false);
        })
      )
      .subscribe({
        /**
         * This method is called on successful completion of the request made to backend
         *
         * @param {any} response is the response from backend
         */
        next: (response: any) => {
          /**
           * This is the response from backend that is mapped using the BackendResponse model
           *
           * @type {BackendResponse}
           * @const
           */
          const backendResponse: BackendResponse = new BackendResponse(
            response
          );

          /**
           * If data is deleted successfully, updating the insights and then regenerating graph data
           */
          this.insights.splice(index, 1);
          this.generateGraphData();

          /**
           * Showing a success toastr with message either from backend or a static success message
           */
          this.toastrService.success(
            backendResponse.message ||
              BACKEND_ACTION_CONSTANTS.INSIGHT_DELETION_SUCCESSFUL
          );
        },

        /**
         * This method is called if the request made to backend was not successful
         *
         * @param {any} response is the response from backend
         */
        error: (response: BackendResponse) => {
          /**
           * This method is called if the request made to backend was not successful
           *
           * @param response is the response from backend
           */
          const backendResponse: BackendResponse = new BackendResponse(
            response
          );

          /**
           * Showing a error toastr with message either from backend or a static error message
           */
          this.toastrService.error(
            backendResponse.message ||
              BACKEND_ACTION_CONSTANTS.INSIGHT_DELETION_UNSUCCESSFUL
          );
        },
      });
  }

  nameChanged(e: any) {
    console.log(e);
  }
}
