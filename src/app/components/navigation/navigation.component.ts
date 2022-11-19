import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor(private sharedService: SharedService) {}
  currentBackground: string = 'light';

  async ngOnInit() {
    this.sharedService.currentStyle.subscribe((currentBackground) => {
      console.log(currentBackground);
      this.currentBackground = currentBackground;
    });
  }
}
