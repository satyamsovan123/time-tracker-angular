import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/utils/shared.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  showLoader: boolean = false;
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.showLoader.subscribe((status: boolean) => {
      this.showLoader = status;
    });
  }
}
