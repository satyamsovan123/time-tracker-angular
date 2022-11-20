import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor() {}

  log(data: any) {
    if (!environment.production) console.log(data);
  }
}
