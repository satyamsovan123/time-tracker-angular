import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Signup } from 'src/app/models/signup.model';
import { API_CONSTANTS } from 'src/app/constants/backend.constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private httpClient: HttpClient) {}

  signup(newUser: Signup) {
    console.log(newUser);
    return this.httpClient.post(
      environment.backendURL + API_CONSTANTS.SIGNUP,
      newUser
    );
  }
}
