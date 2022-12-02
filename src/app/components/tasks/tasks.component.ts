import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';
import { LoggerService } from 'src/app/services/utils/logger.service';
import { SharedService } from 'src/app/services/utils/shared.service';
import { Task } from 'src/app/models/task.model';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import {
  COMMON_CONSTANTS,
  FORM_CONSTANTS,
} from 'src/app/constants/common.constant';
import * as moment from 'moment';
import { BackendResponse } from 'src/app/models/backendResponse.model';
import { BACKEND_ACTION_CONSTANTS } from 'src/app/constants/backend.constant';

/**
 * This component serves as main component when user is in the /tasks route. This component hadndles the logic for adding new timings and updating the time for the current day
 *
 * @requires {@link SharedService}
 * @requires {@link BackendService}
 * @requires {@link LoggerService}
 */
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private backendService: BackendService,
    private loggerService: LoggerService,
    private toastrService: ToastrService
  ) {}

  /**
   * This is the task (i.e. single timing row)
   *
   * @type {Task}
   */
  task!: Task;

  /**
   * This is the array of task list
   *
   * @type {any | [Task]}
   */
  taskList: Task[] | any = [];

  /**
   * This is tip for time used field
   *
   * @type {string}
   */
  timeUsedInputTip: string = FORM_CONSTANTS.TIME_USED_TIP;

  /**
   * This is tip for start time
   *
   * @type {string}
   */
  startTimeInputTip: string = FORM_CONSTANTS.START_TIME_TIP;

  /**
   * This is tip for end time
   *
   * @type {string}
   */
  endTimeInputTip: string = FORM_CONSTANTS.END_TIME_TIP;

  /**
   * This is tip for deleting a task row
   *
   * @type {string}
   */
  deleteTaskInputTip: string = FORM_CONSTANTS.DELETE_TASK_TIP;

  /**
   * This method is one of the lifecycle hooks for the AppComponent, it is called in the beginning of the component.
   * It also updates the current style to dark, as it uses a light background, so that the updated style would be captured by the navigation component to change the color of navigation component. It starts the loader as soon as this component comes to the view, as it needs to fetch user information in the background from backend
   *
   * @returns {void} it returns nothing
   */
  ngOnInit(): void {
    /**
     * Setting the loader status to true and updating the current color scheme
     */
    this.sharedService.updateLoaderStatus(true);
    this.sharedService.updateStyle('light');

    /**
     * Creating a new task, by calling {@link createNewTask()} method
     */
    this.task = this.createNewTask();

    /**
     * Calling the backend service to get the tasks for the signed in user
     */
    this.backendService
      .getTasks()
      .pipe(
        finalize(() => {
          /**
           * Setting the loader status to false, on succesful completion of backend call or on on unsuccesful completion of backend call
           */
          this.sharedService.updateLoaderStatus(false);

          /**
           * If taskList received from backend has no elements, then pushing a single row
           */
          // if (this.taskList.length === 0) this.taskList.push(this.task);
          // if (this.taskList.length === 0)
          //   this.taskList = this.generateDefaultTaskList();
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
           * Updating the task list with the data received from backend
           */
          this.taskList = this.sanitizedReceivedData(response.data);
        },
        /**
         * This method is called if the request made to backend was not successful
         *
         * @param {BackendResponse} response is the response from backend
         */
        error: (response: BackendResponse) => {
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
           * Showing a success toastr with message either from backend or a static success message
           */
          this.toastrService.error(
            BACKEND_ACTION_CONSTANTS.UNABLE_TO_FETCH_TIMESHEET
          );
        },
      });
  }

  /**
   * This method retuns a new task. By default, it generates current time as start time and one hour after as end time
   */
  createNewTask(): Task {
    /**
     * This is the current time
     *
     * @type {string}
     */
    let currentTime: moment.Moment | string = moment();

    /**
     * This is adding 59 minutes after the current time
     *
     * @type {string}
     */
    let oneHourAfter: moment.Moment | string = moment().add(59, 'm');

    /**
     * Checking if by adding 59 minutes to current time, makes it tommorrow's date, then adjusting it manually to 23:59 hrs.
     */
    if (currentTime.format('DD/MM/YY') > oneHourAfter.format('DD/MM/YY')) {
      currentTime = moment().format('HH:mm').toString();
      oneHourAfter = moment().add(59, 'm').format('HH:mm').toString();
    } else {
      currentTime = moment().format('HH:mm').toString();
      oneHourAfter = moment().endOf('day').format('HH:mm').toString();
    }

    /**
     * This is the task model, pre initialized with some default values
     *
     * @type {Task}
     * @const
     */
    const task: Task = {
      startTime: currentTime,
      endTime: oneHourAfter,
      timeUsed: Number(this.calculateTimeDifference(currentTime, oneHourAfter)),
    };
    return task;
  }

  /**
   * This method pushes new task to the task list
   *
   * @returns {void} it returns nothing
   */
  addNewTask(): void {
    this.taskList.push(this.createNewTask());
  }

  /**
   * This method validates the task list submitted by the user
   *
   * @returns {boolean} it returns true, if the task list submitted by the user is valid, else it returns false
   */
  validateTasks(): boolean {
    /**
     * This is the validation status i.e. it contains true, if the task list form is valid
     */
    let validationStatus: boolean = true;

    /**
     * This is message that eould be shown, if the task list is invalid, it is initialized with a default error message
     */
    let message: string = COMMON_CONSTANTS.GENERIC_ERROR_MESSAGE;

    /**
     * Looping over the submitted task list to check for any invalid task
     */
    this.taskList.forEach((task: Object | any, index: number) => {
      /**
       * Checking if the startTime is invalid, then creating a message with the appropriate index to be shown to user
       */
      if (!task.startTime) {
        message =
          FORM_CONSTANTS.INVALID_START_TIME +
          ' ' +
          FORM_CONSTANTS.FOR_ROW +
          ' ' +
          String(index + 1) +
          '.';
        validationStatus = false;
      }

      /**
       * Checking if the endTime is invalid, then creating a message with the appropriate index to be shown to user
       */
      if (!task.endTime) {
        message =
          FORM_CONSTANTS.INVALID_END_TIME +
          ' ' +
          FORM_CONSTANTS.FOR_ROW +
          ' ' +
          String(index + 1) +
          '.';
        validationStatus = false;
      }

      /**
       * Checking if the timeUsed is invalid, then creating a message with the appropriate index to be shown to user
       */
      if (task.timeUsed === null || task.timeUsed <= 0) {
        message =
          FORM_CONSTANTS.INVALID_TIME_USED +
          ' ' +
          FORM_CONSTANTS.FOR_ROW +
          ' ' +
          String(index + 1) +
          '.';
        validationStatus = false;
      }
    });

    /**
     * Checking if the validation status is false, then showing an error toastr with the message created by the {@link createFormErrorToastr()} method
     */
    if (!validationStatus) this.createFormErrorToastr(message);
    return validationStatus;
  }

  /**
   * This method formats the string date to "DD/MM/YYYY"
   *
   * @param {string} timeInString is the date in string format
   * @returns {Date} it returns a date
   */
  convertStringToTime(timeInString: string): Date {
    /**
     * Converting the date, formatting into string with "DD/MM/YYYY" format
     *
     * @type {string}
     * @const
     */
    const currentDate: string = moment().format('DD/MM/YYYY').toString();
    return moment(
      currentDate + ' ' + timeInString,
      'DD/MM/YYYY HH:mm',
      true
    ).toDate();
  }

  /**
   * This method formats UTC date recevied from backend to local time zone, and returns it as a string, by converting it to HH:mm format
   *
   * @param {Date} timeInUTC is the date in UTC format
   * @returns {string} it returns a date converted to string
   */
  convertTimeToString(timeInUTC: Date): string {
    /**
     * Converting the date, formatting into date with "HH:,," format
     *
     * @type {string}
     * @const
     */
    const localTime: string = moment.utc(timeInUTC).local().format('HH:mm');
    return localTime;
  }

  /**
   * Since from backend, all dates comes as UTC formatted, this method receives the tasklist form the backend and converts the times to local format and the HTML input readable format
   *
   * @param {[] | any} taskList is the tasklist received from backend for the signed in user
   * @returns {Task[]} it returns the sanitized task list
   */
  sanitizedReceivedData(taskList: any): Task[] {
    /**
     * This is the sanitized task list
     *
     * @type {Task[]}
     */
    let sanitizedTaskList: Task[] = [];

    /**
     * Looping over the received task list and converting the dates, and pushing the converted date values to sanitized array
     */
    taskList.forEach((task: Task | any) => {
      const sanitizedStartTime = this.convertTimeToString(task.startTime);
      const sanitizedEndTime = this.convertTimeToString(task.endTime);
      sanitizedTaskList.push({
        startTime: sanitizedStartTime,
        endTime: sanitizedEndTime,
        timeUsed: task.timeUsed,
      });
    });
    this.loggerService.log(sanitizedTaskList);

    return sanitizedTaskList;
  }

  /**
   * This method sanitizes the tasklist back to the backend compatible format i.e. "HH:mm" to ISO format
   *
   * @param {Task[]} taskList is the task list that is submitted by the user
   * @returns {Task[]} it returns nothing
   */
  sanitizeTaskList(taskList: Task[]): Task[] {
    /**
     * This is the sanitized task list, it is initialized with []
     *
     * @type {any[]}
     * @const
     */
    const sanitizedTaskList: any[] = [];

    /**
     * Looping over each task and converting them back to local time zone
     * i.e. "HH:mm" to ISO format
     */
    taskList.forEach((task: Task) => {
      const sanitizedStartTime: Date = this.convertStringToTime(
        task.startTime as string
      );
      const sanitizedEndTime: Date = this.convertStringToTime(
        task.endTime as string
      );
      sanitizedTaskList.push({
        startTime: sanitizedStartTime,
        endTime: sanitizedEndTime,
        timeUsed: task.timeUsed,
        dateAdded: new Date(),
      });
    });
    return sanitizedTaskList;
  }

  /**
   * This method saves the changes made by the user, it sends the entire task list to the backend for saving
   *
   * @returns {void} it returns nothing
   */
  saveChanges(): void {
    /**
     * Setting the loader status to true, as it might take some time to validate form, send and receive data from backend
     */
    this.sharedService.updateLoaderStatus(true);

    /**
     * This method calls {@link validateTasks()} method to validate the user input. This variable holds true or false
     *
     * @type {boolean}
     * @const
     */
    const validationStatus: boolean = this.validateTasks();

    /**
     * Checking if the form is not valid, then showing an toastr and returning, else continuing further
     */
    if (!validationStatus) {
      this.sharedService.updateLoaderStatus(false);
      this.toastrService.info(FORM_CONSTANTS.TASK_FORM_VALDITY);
      this.createFormErrorToastr(FORM_CONSTANTS.INVALID_FORM);

      return;
    }

    /**
     * This method then calls the {@link sanitizeTaskList()} method to sanitize the user input to make it ready for backend readable format
     *
     * @type {any}
     * @const
     */
    const sanitizedTaskList: any = this.sanitizeTaskList(this.taskList);

    this.backendService
      .saveTasks(sanitizedTaskList)
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

          this.toastrService.success(
            backendResponse.message ||
              BACKEND_ACTION_CONSTANTS.TIMESHEET_UPDATION_SUCCESSFUL
          );
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
            response.error
          );

          /**
           * Showing a error toastr with message either from backend or a static error message
           */
          this.loggerService.log(backendResponse);
          this.toastrService.error(
            backendResponse.message ||
              BACKEND_ACTION_CONSTANTS.TIMESHEET_UPDATION_UNSUCCESSFUL
          );
        },
      });
  }

  /**
   * This method deletes the task summary from the insights array
   *
   * @param {number} index is the index of the insight that user wants to delete
   * @returns {void} it returns nothing
   */
  deleteTask(index: number): void {
    this.taskList.splice(index, 1);
  }

  /**
   * This method calls the toastr service to show the error message
   *
   * @param {string} message is the message that needs to be shown in the toastr
   * @returns {void} it returns nothing
   */
  createFormErrorToastr(message: string): void {
    this.toastrService.error(message);
  }

  /**
   * This method is called when user clicks on the generate timing button. It generates a new task list with 24 rows i.e. one for each hour interval (this one's for you lazy users), and shows them in the UI.
   *
   * @returns {void} it returns nothing
   */
  generateDefaultTaskList(): void {
    /**
     * This is the default task list, pre initialized with []
     *
     * @type {[Task]}
     */
    let defaultTaskListWithOneHourInterval: Task[] = [];

    /**
     * Generating the startTime and endTime using loop
     */
    for (let i = 0; i < 24; i++) {
      /**
       * This is the task model, pre initialized with some default values
       *
       * @type {Task}
       */
      let task: Task = {
        startTime: `${i < 10 ? '0' : ''}${i}:00`,
        endTime: `${i < 10 ? '0' : ''}${i}:59`,
        timeUsed: Number(
          this.calculateTimeDifference(
            `${i < 10 ? '0' : ''}${i}:00`,
            `${i < 10 ? '0' : ''}${i}:59`
          )
        ),
      };

      defaultTaskListWithOneHourInterval.push(task);
    }

    this.taskList = defaultTaskListWithOneHourInterval;
  }

  /**
   * This method is called when user clicks on the clear all timings button, it empties the table
   *
   * @returns {void} it returns nothing
   */
  clearAllTasks(): void {
    this.taskList = [];
  }

  /**
   * This method calculates the difference between start time and end time entered by the user
   *
   * @param {string} startTime is the start time
   * @param {string} endTime is the end time
   * @returns {string} it the calculated time differnece in hours (string)
   */
  calculateTimeDifference(startTime: string, endTime: string): string {
    /**
     * This variable holds the difference between start time and end time
     *
     * @type {string}
     */
    let differenceInHours: string = '';

    /**
     * This variable holds the current date
     *
     * @type {string}
     */
    const currentDate: string = moment().format('DD/MM/YYYY').toString();

    /**
     * This variable holds the sanitized start time i.e it's converted from "HH:mm" to ISO
     *
     * @type {any}
     */
    const sanitizedStartTime: any = moment(
      currentDate + ' ' + startTime,
      'DD/MM/YYYY HH:mm',
      true
    );

    /**
     * This variable holds the sanitized end time i.e it's converted from "HH:mm" to ISO
     *
     * @type {any}
     */
    const sanitizedEndTime: any = moment(
      currentDate + ' ' + endTime,
      'DD/MM/YYYY HH:mm',
      true
    );

    differenceInHours = moment
      .duration(sanitizedEndTime.diff(sanitizedStartTime))
      .asHours()
      .toString();

    if (
      !differenceInHours ||
      differenceInHours === 'NaN' ||
      Number(differenceInHours) < 0
    ) {
      differenceInHours = '0';
    }
    return differenceInHours;
  }

  /**
   * This method calculates the difference between start time and end time entered by the user, it's called as soon as the user changes the start time and end time input values, it calculates and updates the time used field on the go
   *
   * @param {string} index is the end time
   * @param {string} startTime is the start time
   * @param {string} endTime is the end time
   *
   * @returns {void} it returns nothing
   */
  updateTimeUsedValue(index: number, startTime: string, endTime: string): void {
    this.taskList[index].timeUsed = this.calculateTimeDifference(
      startTime,
      endTime
    );
  }
}
