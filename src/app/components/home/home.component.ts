import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { LoggerService } from 'src/app/services/utils/logger.service';
import { SharedService } from 'src/app/services/utils/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private elementRef: ElementRef,
    private loggerService: LoggerService
  ) {}

  @ViewChild('backgroundLine') backgroundLine: any;
  @ViewChild('backgroundLineDiv') backgroundLineDiv: any;

  ngOnInit(): void {
    this.sharedService.updateStyle('dark');
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.elementRef.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    const svgLength = this.backgroundLine.nativeElement.getTotalLength();
    this.backgroundLine.nativeElement.style.strokeDasharray = svgLength;
    this.backgroundLine.nativeElement.style.strokeDashoffset = svgLength;
    let scrollPercent: number;

    this.loggerService.log([svgLength, scrollPosition, componentPosition]);

    if (scrollPosition < componentPosition) {
      this.backgroundLineDiv.nativeElement.style.setProperty(
        'display',
        'block',
        'important'
      );
    }
    if (scrollPosition >= componentPosition) {
      scrollPercent = (scrollPosition - componentPosition) / svgLength;

      const draw = svgLength * scrollPercent * 7.9;
      this.loggerService.log(['draw', svgLength - draw]);

      this.backgroundLine.nativeElement.style.strokeDashoffset =
        draw - svgLength;
    }
  }
}
