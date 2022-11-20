import { Component, OnInit } from '@angular/core';
import { Help } from 'src/app/models/help.model';
import { GenerateHelpDataService } from 'src/app/services/utils/generate-help-data.service';
import { LoggerService } from 'src/app/services/utils/logger.service';
import { SharedService } from 'src/app/services/utils/shared.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
})
export class HelpComponent implements OnInit {
  helpData: Help[] = [];

  constructor(
    private sharedService: SharedService,
    private generateHelpDataService: GenerateHelpDataService,
    private loggerService: LoggerService
  ) {}
  ngOnInit(): void {
    this.sharedService.updateStyle('light');
    this.helpData = this.generateHelpDataService.getHelpData();
    this.loggerService.log(this.helpData);
  }
}
