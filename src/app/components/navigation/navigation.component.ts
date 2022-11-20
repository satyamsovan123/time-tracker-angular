import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { LoggerService } from 'src/app/services/utils/logger.service';
import { SharedService } from 'src/app/services/utils/shared.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private loggerService: LoggerService
  ) {}
  currentBackground: string = 'light';

  async ngOnInit() {
    this.sharedService.currentStyle.subscribe((currentBackground) => {
      this.loggerService.log(currentBackground);
      this.currentBackground = currentBackground;
    });
  }
}
