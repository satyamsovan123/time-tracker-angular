import { ChartConfiguration } from 'chart.js';

export const DashboardChartConfiguration: ChartConfiguration['options'] = {
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
