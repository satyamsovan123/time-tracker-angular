import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  currentStyle: ReplaySubject<any> = new ReplaySubject();

  constructor() {}

  updateStyle(style: string) {
    this.currentStyle.next(style);
  }
}
