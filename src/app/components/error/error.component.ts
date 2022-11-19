import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  errorMessage = 'Some error occured.';
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.updateStyle('light');
  }
}
