import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * This service is used to log values into the browser console
 */
@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  /**
   * This method logs the data that is passed into the console. It only logs them, if the current environment is not production.

   * @param {any} data is the data that needed to be printed into the browser console
   * @returns {void} it returns nothing
   */
  log(data: any): void {
    /**
     * Checking, if the current environment is not production, then it logs into the conosole, else it does not logs into the console.
     */
    if (!environment.production) console.log(data);
  }
}
