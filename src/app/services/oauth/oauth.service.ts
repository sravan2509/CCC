import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OAuthService {
  constructor(private http:HttpClient) { }
  GetAuthPage():Observable<string>{
  return this.http.get<string>(environment.baseUrl+'/AuthPage');
  }
  getAcessToken(auth_code:string){
  return this.http.post(environment.baseUrl+'/getAccessToken',{code:auth_code});
  }
  getUserDetails(){
  return this.http.get(environment.baseUrl+'/getUserDetails');
  }
  logout(){
  return this.http.get(environment.baseUrl+'/logout');
  }}
