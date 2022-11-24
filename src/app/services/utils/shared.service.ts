import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

/**
 * This service is used to get and set the shared variables (observables mostly), across the module
 */
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  /**
   * This observable holds the current style of the background
   *
   * @type {Observable<string>}
   */
  currentStyle: ReplaySubject<string> = new ReplaySubject();

  /**
   * This observable holds true, if the user is authenticated
   *
   * @type {Observable<boolean>}
   */
  isAuthenticated: ReplaySubject<boolean> = new ReplaySubject();

  /**
   * This observable holds the value to check if we need to show the loader or not
   *
   * @type {Observable<boolean>}
   */
  showLoader: ReplaySubject<boolean> = new ReplaySubject();

  /**
   * This method updates the current style, i.e. pushes a new value to the stream
   *
   * @param {{string}} style is the string that is updated, which is then received by all the subscribers
   * @returns {void} it returns nothing
   */
  updateStyle(style: string): void {
    this.currentStyle.next(style);
  }

  /**
   * This method updates the current status to show or disable loader, i.e. pushes a new value to the stream
   *
   * @param {{boolean}} status is the boolean that is updated, which is then received by all the subscribers
   * @returns {void} it returns nothing
   */
  updateLoaderStatus(status: boolean): void {
    this.showLoader.next(status);
  }

  /**
   * This method updates the current status of authentication
   *
   * @param {{boolean}} status is the boolean that is updated, which is then received by all the subscribers
   * @returns {void} it returns nothing
   */
  updateIsAuthenticated(status: boolean): void {
    this.isAuthenticated.next(status);
  }

  getIsAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.isAuthenticated.subscribe({
        next: (isAuthenticated) => {
          resolve(isAuthenticated);
          console.log('222');
        },
        error: (error) => {
          resolve(false);
        },
      });
    });
  }
}
