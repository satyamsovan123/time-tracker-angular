import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private elementRef: ElementRef
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

    console.log(svgLength, scrollPosition, componentPosition);

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
      console.log('draw', svgLength - draw);
      this.backgroundLine.nativeElement.style.strokeDashoffset =
        draw - svgLength;
    }
  }
}
