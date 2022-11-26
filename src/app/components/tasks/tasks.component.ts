import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend/backend.service';
import { LoggerService } from 'src/app/services/utils/logger.service';
import { SharedService } from 'src/app/services/utils/shared.service';
import { Task } from 'src/app/models/task.model';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
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
 *
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

  task!: Task;
  taskList: any = [];

  ngOnInit(): void {
    this.sharedService.updateStyle('light');
    this.sharedService.updateLoaderStatus(true);
    this.task = this.createNewTask();
    this.backendService
      .getTasks()
      .pipe(
        finalize(() => {
          /**
           * Setting the loader status to false, on succesful completion of backend call or on on unsuccesful completion of backend call
           */
          this.sharedService.updateLoaderStatus(false);

          if (this.taskList.length === 0) this.taskList.push(this.task);
        })
      )
      .subscribe({
        next: (response: any) => {
          this.taskList = this.sanitizedReceivedData(response.data);
        },
        error: (response) => {
          const backendResponse: BackendResponse = new BackendResponse(
            response
          );

          this.toastrService.error(
            backendResponse.message ||
              BACKEND_ACTION_CONSTANTS.UNABLE_TO_FETCH_TIMESHEET
          );
        },
      });
  }

  createNewTask(): Task {
    const task: Task = {
      startTime: '00:00',
      endTime: '23:59',
      timeUsed: 1.5,
    };
    return task;
  }

  addNewTime(): void {
    this.taskList.push(this.createNewTask());
  }

  validateTasks(): boolean {
    let validationStatus: boolean = true;
    let message: string = COMMON_CONSTANTS.GENERIC_ERROR_MESSAGE;

    this.taskList.forEach((task: Object | any, index: number) => {
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
      if (task.timeUsed === null || task.timeUsed < 0) {
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
    if (!validationStatus) this.createFormErrorToastr(message);
    return validationStatus;
  }

  convertStringToTime(timeInString: string): Date {
    const currentDate: string = moment().format('DD/MM/YYYY').toString();
    return moment(
      currentDate + ' ' + timeInString,
      'DD/MM/YYYY HH:mm',
      true
    ).toDate();
  }

  convertTimeToString(timeInUTC: Date): string {
    const localTime = moment.utc(timeInUTC).local().format('HH:mm');
    return localTime;
  }

  sanitizedReceivedData(taskList: any): Task[] {
    let sanitizedTaskList: Task[] = [];
    taskList.forEach((task: Task | any) => {
      const sanitizedStartTime = this.convertTimeToString(task.startTime);
      const sanitizedEndTime = this.convertTimeToString(task.endTime);
      sanitizedTaskList.push({
        startTime: sanitizedStartTime,
        endTime: sanitizedEndTime,
        timeUsed: task.timeUsed,
      });
    });
    return sanitizedTaskList;
  }

  sanitizeTaskList(taskList: Task[]): Task[] {
    const sanitizedTaskList: any[] = [];

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

  saveChanges(): void {
    /**
     * Setting the loader status to true, as it might take some time to validate form, send and receive data from backend
     */
    this.sharedService.updateLoaderStatus(true);

    const validationStatus: boolean = this.validateTasks();

    if (!validationStatus) {
      this.sharedService.updateLoaderStatus(false);
      this.createFormErrorToastr(FORM_CONSTANTS.INVALID_FORM);
      return;
    }

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
        next: (response: any) => {
          const backendResponse: BackendResponse = new BackendResponse(
            response
          );

          this.toastrService.success(
            backendResponse.message ||
              BACKEND_ACTION_CONSTANTS.TIMESHEET_UPDATION_SUCCESSFUL
          );
        },
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

  deleteTiming(index: number): void {
    this.taskList.splice(index, 1);
  }

  createFormErrorToastr(message: string): void {
    this.toastrService.error(message);
  }
}
