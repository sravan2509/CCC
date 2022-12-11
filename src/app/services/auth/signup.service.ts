import { Injectable } from '@angular/core';
import { signup } from '../../config/serverurls';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  public signup(userData: any) {
    return this.http.post<any>(signup, userData);
  }

}
