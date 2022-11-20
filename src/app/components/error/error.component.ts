import { Component, OnInit } from '@angular/core';
import { COMMON_CONSTANTS } from 'src/app/constants/common.constant';
import { SharedService } from 'src/app/services/utils/shared.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  errorMessage: string = 'Some error occured.';
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.updateStyle('light');
    this.errorMessage = COMMON_CONSTANTS.UNAUTHORIZED;
  }
}
