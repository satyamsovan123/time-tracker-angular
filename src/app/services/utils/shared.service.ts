import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  currentStyle: ReplaySubject<string> = new ReplaySubject();
  showLoader: ReplaySubject<boolean> = new ReplaySubject();

  constructor() {}

  updateStyle(style: string) {
    this.currentStyle.next(style);
  }

  updateLoaderStatus(status: boolean) {
    this.showLoader.next(status);
  }
}
