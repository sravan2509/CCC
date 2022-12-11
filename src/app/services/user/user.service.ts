import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { update_user_details, get_user_details, delete_account } from '../../config/serverurls';

@Injectable({
  providedIn: 'root'
})
export class UserService1 {

  constructor(private http: HttpClient) { }

  updateUserDetails(data: any) {
    return this.http.put<any>(update_user_details, data);
  }
  public getUserDetails() {
    return this.http.get<any>(get_user_details + '/' + localStorage.getItem('userid'));
  }
  public deleteAccount() {
    return this.http.delete<any>(delete_account + '/' + localStorage.getItem('userid'));
  }
  // public getUsers() {
  //   return this.http.get<any>(get_user_suggestion + '/' + localStorage.getItem('userid'));
  // }
}
