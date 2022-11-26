import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  AfterViewInit,
} from '@angular/core';
import {
  ChartConfiguration,
  ChartData,
  ChartType,
  Chart,
  Point,
} from 'chart.js';
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
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { DashboardChartConfiguration } from 'src/app/configs/chart.config';

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

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  screenHeight: number = 0;
  screenWidth: number = 0;
  deleteConfirmationMessage: string = '';
  insights: any = [];
  currentName: string = '';

  public barChartOptions: ChartConfiguration['options'] =
    DashboardChartConfiguration;

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    datasets: [],
  };

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.loggerService.log([this.screenWidth, window.innerWidth]);
    if (window.innerWidth < 500) {
      return false;
    } else {
      return true;
    }
  }

  async ngOnInit(): Promise<void> {
    this.deleteConfirmationMessage =
      COMMON_CONSTANTS.DELETE_ACCOUNT_CONFIRMATION;
    this.sharedService.updateStyle('light');
    this.sharedService.updateLoaderStatus(true);

    try {
      const getProfileResult: any = await this.backendService.getProfile();

      this.currentName =
        getProfileResult.data.firstName + ' ' + getProfileResult.data.lastName;

      const getInsightsResult: any = await this.backendService.getInsights();
      this.insights = getInsightsResult.data;

      console.log(this.insights, getProfileResult);
      this.generateGraphData();

      this.sharedService.updateLoaderStatus(false);
    } catch (response: any) {
      this.sharedService.updateLoaderStatus(false);

      this.toastrService.error(
        response.message ||
          BACKEND_ACTION_CONSTANTS.TIMESHEET_UPDATION_UNSUCCESSFUL
      );
    }
  }

  deleteAccount(): void {
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
        next: (response: any) => {
          const backendResponse: BackendResponse = new BackendResponse(
            response
          );

          this.toastrService.error(
            backendResponse.message ||
              BACKEND_ACTION_CONSTANTS.ACCOUNT_DELETION_SUCCESSFUL
          );
        },
        error: (response) => {
          const backendResponse: BackendResponse = new BackendResponse(
            response
          );

          this.toastrService.error(
            backendResponse.message ||
              BACKEND_ACTION_CONSTANTS.ACCOUNT_DELETION_UNSUCCESSFUL
          );
        },
      });
    this.sharedService.removeTokenFromLocalStorage();
    this.sharedService.updateToken('');
    this.router.navigateByUrl('/signin');

    // this.backendService.s
  }

  generateGraphData(): void {
    const yAxisHoursData: [] | any = [];
    const xAxisDateData: [] | any = [];

    this.insights.forEach((insight: {} | any) => {
      xAxisDateData.push(this.convertStringToDate(insight.dateAdded));
      yAxisHoursData.push(insight.timeUsed);
    });

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
    this.barChartData = data;
  }

  convertStringToDate(timeInUTCString: any) {
    const localTime = moment.utc(timeInUTCString).local().format('DD/MM/YYYY');
    return localTime;
  }

  deleteInsight(index: number): void {
    this.sharedService.updateLoaderStatus(true);

    this.backendService
      .deleteInsight(this.insights[index].dateAdded)
      .pipe(
        finalize(() => {
          /**
           * Setting the loader status to false, on succesful completion of backend call or on on unsuccesful completion of backend call
           */
          this.sharedService.updateLoaderStatus(false);
          this.insights.splice(index, 1);
        })
      )
      .subscribe({
        next: (response: any) => {
          const backendResponse: BackendResponse = new BackendResponse(
            response
          );

          this.toastrService.error(
            backendResponse.message ||
              BACKEND_ACTION_CONSTANTS.INSIGHT_DELETION_SUCCESSFUL
          );
        },
        error: (response) => {
          const backendResponse: BackendResponse = new BackendResponse(
            response
          );

          this.toastrService.error(
            backendResponse.message ||
              BACKEND_ACTION_CONSTANTS.INSIGHT_DELETION_UNSUCCESSFUL
          );
        },
      });
  }
}
