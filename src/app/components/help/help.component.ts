import { Component, OnInit } from '@angular/core';
import { Help } from 'src/app/models/help.model';
import { GenerateHelpDataService } from 'src/app/services/utils/generate-help-data.service';
import { LoggerService } from 'src/app/services/utils/logger.service';
import { SharedService } from 'src/app/services/utils/shared.service';

/**
 * This component serves as main component where users sees the help questions and answers
 *
 * @requires {@link SharedService}
 * @requires {@link LoggerService}
 * @requires {@link GenerateHelpDataService}
 *
 */
@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
})
export class HelpComponent implements OnInit {
  /**
   * This the array of static questions and answers that is shown to the user
   *
   * @type {[Help]}
   */
  helpData: Help[] = [];

  constructor(
    private sharedService: SharedService,
    private generateHelpDataService: GenerateHelpDataService,
    private loggerService: LoggerService
  ) {}

  /**
   * This method is one of the lifecycle hooks for the AppComponent, it is called in the beginning of the component.
   * This method gets the help data from the {@link GenerateHelpDataService}. It also updates the current style to light, as it uses a light background, so that the updated style would be captured by then navigation component to show the required color.
   *
   * @returns {void} it returns nothing
   */
  ngOnInit(): void {
    this.sharedService.updateStyle('light');
    this.helpData = this.generateHelpDataService.getHelpData();
    this.loggerService.log(this.helpData);
  }
}
