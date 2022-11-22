import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { SharedService } from 'src/app/services/utils/shared.service';
import { LoggerService } from 'src/app/services/utils/logger.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  screenHeight: number = 0;
  screenWidth: number = 0;

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

  ngOnInit(): void {
    this.sharedService.updateStyle('light');
  }

  constructor(
    private sharedService: SharedService,
    private loggerService: LoggerService
  ) {
    this.onResize();
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,

    scales: {
      x: {
        title: {
          padding: 10,
          display: window.innerWidth > 500,
          text: 'Dates',
          font: {
            size: 15,
            family:
              '-apple-system, BlinkMacSystemFont, "Inter", Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            weight: '400',
          },
          color: '#ee7b39',
          align: 'center',
        },
        ticks: {
          maxRotation: 90,
          minRotation: 90,
          color: '#ee7b39',
          font: {
            size: 15,
            family:
              '-apple-system, BlinkMacSystemFont, "Inter", Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            weight: '400',
          },
        },
        grid: {
          color: '#ee7b39',
          lineWidth: 0.2,
        },
      },
      y: {
        title: {
          padding: 10,
          display: window.innerWidth > 500,
          text: 'Hours used',
          font: {
            size: 15,
            family:
              '-apple-system, BlinkMacSystemFont, "Inter", Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            weight: '400',
          },
          color: '#ee7b39',
          align: 'center',
        },
        min: 0,
        max: 24,
        ticks: {
          stepSize: 2,
          color: '#ee7b39',
          font: {
            size: 15,
            family:
              '-apple-system, BlinkMacSystemFont, "Inter", Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            weight: '400',
          },
        },
        grid: {
          color: '#ee7b39',
          lineWidth: 0.2,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            size: 15,
            family:
              '-apple-system, BlinkMacSystemFont, "Inter", Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            weight: '400',
          },
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#ee7b39',
        font: {
          size: 15,
          family:
            '-apple-system, BlinkMacSystemFont, "Inter", Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        },
      },
      tooltip: {
        backgroundColor: '#000000',
        titleColor: '#fef7ea',
        bodySpacing: 10,
        padding: 10,
        bodyColor: '#ee7b39',
        bodyFont: {
          size: 15,
          family:
            '-apple-system, BlinkMacSystemFont, "Inter", Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          weight: '400',
        },
        titleFont: {
          size: 15,
          family:
            '-apple-system, BlinkMacSystemFont, "Inter", Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          weight: '400',
        },
        titleMarginBottom: 15,
        cornerRadius: 5,
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: [
      '02/11/2022',
      '03/11/2022',
      '05/11/2022',
      '07/11/2022',
      '09/11/2022',
      '10/11/2022',
      '11/11/2022',
      '16/11/2022',
      '17/11/2022',
      '18/11/2022',
      '19/11/2022',
      '20/11/2022',
      '21/11/2022',
      '25/11/2022',
      '26/11/2022',
      '27/11/2022',
    ],
    datasets: [
      {
        data: [11, 5, 1, 0.1, 2, 14, 2.3, 8.34, 11, 14, 2, 19, 1.2, 2, 14, 3],
        label: 'Total hours used',
        borderColor: '#ee7b39',
        backgroundColor: '#ee7b39',
        borderRadius: 5,
        maxBarThickness: 50,
        hoverBackgroundColor: '#ee7b39',
      },
    ],
  };
}
