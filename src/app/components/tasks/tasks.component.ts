import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';
import { SharedService } from 'src/app/services/utils/shared.service';

/**
 * This component serves as main component when user is in the /tasks route. This component hadndles the logic for adding new timings and updating the time for the current day
 *
 * @requires {@link SharedService}
 * @requires {@link BackendService}
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
    private backendServide: BackendService
  ) {}

  ngOnInit(): void {
    this.sharedService.updateStyle('light');
  }

  addNewTime(): void {}

  saveChanges(): void {
    /**
     * Setting the loader status to true, as it might take some time to validate form, send and receive data from backend
     */
    this.sharedService.updateLoaderStatus(true);
  }

  deleteTiming(): void {}
}
