import { Component, OnInit } from '@angular/core';
import { SharedService } from './services/utils/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private sharedService: SharedService) {}
  title = 'time-tracker';

  disableBackground: boolean = false;
  ngOnInit(): void {
    this.sharedService.showLoader.subscribe((status: boolean) => {
      this.disableBackground = status;
    });
  }
}
