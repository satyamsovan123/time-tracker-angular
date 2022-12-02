import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { LoggerService } from 'src/app/services/utils/logger.service';
import { SharedService } from 'src/app/services/utils/shared.service';

/**
 * This component serves as main component to show the home page to user, and it contains the logic to animate the background SVG line on scroll
 *
 * @requires {@link SharedService}
 * @requires {@link LoggerService}
 */
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

  /**
   * This variable holds the current year, which will be shown in the footer
   *
   * @const
   * @type {number}
   */
  currentYear: number = new Date().getFullYear();

  /**
   * This variable holds true if the user is signed in else it holds false
   *
   * @const
   * @type {boolean}
   */
  isUserSignedIn: boolean = false;

  /**
   * Getting the element tagged with #backgroundLine i.e the SVG line
   */
  @ViewChild('backgroundLine') backgroundLine: any;

  /**
   * Getting the element tagged with #backgroundLineDiv i.e the div wrapping the SVG line
   */
  @ViewChild('backgroundLineDiv') backgroundLineDiv: any;

  /**
   * This method is one of the lifecycle hooks for the AppComponent, it is called in the beginning of the component.
   * It also updates the current style to dark, as it uses a dark background, so that the updated style would be captured by the navigation component to change the color of navigation component.
   * It also updates the value of isUserSignedIn, if the user is signed in
   *
   * @returns {void} it returns nothing
   */
  ngOnInit(): void {
    this.sharedService.updateStyle('dark');
    /**
     * This variable holds the current value of token
     *
     * @const
     * @type {string}
     */
    const token: string = this.sharedService.getTokenFromLocalStorage();
    if (token) this.isUserSignedIn = true;
  }

  /**
   * Listening to the 'scroll' event on the entire page, and using that to animate the background SVG line
   * This method is called automatically to listen while scrolling
   *
   * @returns {void} - it returns nothing
   */
  @HostListener('window:scroll', ['$event'])
  checkScroll(): void {
    /**
     * This is the distance in pixels from current component (app-home) to parent component (app-root)
     *
     * @type {number}
     * @const
     */
    const componentPosition: number = this.elementRef.nativeElement
      .offsetTop as number;

    /**
     * This the number of pixels that is scrolled vertically (in the view)
     *
     * @type {number}
     * @const
     */
    const scrollPosition: number = window.scrollY as number;

    /**
     * This the total length of path inside svg (<svg><g> <path> </path> </g></svg>)
     *
     * @type {number}
     * @const
     */
    const svgLength: number =
      this.backgroundLine.nativeElement.getTotalLength();

    /**
     * Updating the start position of the background SVG line
     */
    this.backgroundLine.nativeElement.style.strokeDasharray = svgLength;

    /**
     * This is hiding the background SVG line by offsetting dash
     */
    this.backgroundLine.nativeElement.style.strokeDashoffset = svgLength;

    /**
     * This is the scroll percentage
     *
     * @type {number}
     */
    let scrollPercent: number;

    /**
     * By default, the background SVG line is hidden (using CSS).
     * Checking if the component position equal to or greater than the scroll position, (i.e. if the component is in view, i.e. if the user has scrolled to the required position) then setting the visibility property to visible.
     */
    if (scrollPosition <= componentPosition) {
      this.backgroundLineDiv.nativeElement.style.setProperty(
        'visibility',
        'visible',
        'important'
      );
      this.backgroundLineDiv.nativeElement.style.setProperty(
        'opacity',
        '1',
        'important'
      );
    }

    /**
     * Checking if the component position equal to or greater than the scroll position
     */
    if (scrollPosition >= componentPosition) {
      scrollPercent = (scrollPosition - componentPosition) / svgLength;

      const draw = svgLength * scrollPercent * 7.9;
      this.loggerService.log(['draw', svgLength - draw]);

      // This is done for reversing the drawing
      this.backgroundLine.nativeElement.style.strokeDashoffset =
        draw - svgLength;
    }
  }
}
