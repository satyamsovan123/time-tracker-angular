import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/utils/shared.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.updateStyle('light');
  }
}
