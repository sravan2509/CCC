import { Injectable } from '@angular/core';
import { get_user_challenges, get_challenge_suggestions, accept_challenge, get_challenge_details, reject_challenge, create_challenge, update_challenge, delete_challenge, create_fiddles, get_fiddles, get_fiddle_data, run_fiddle, save_fiddle, delete_fiddle } from '../../config/serverurls';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private http: HttpClient) { }
  public getUserChallenge() {
    return this.http.post<any>(get_user_challenges, { userid: localStorage.getItem('userid')});
  }
  public getChallengeSuggestions() {
    return this.http.get<any>(get_challenge_suggestions + '/' + localStorage.getItem('userid'));
  }
  public acceptChallenge(userData: any) {
    return this.http.post<any>(accept_challenge, userData);
  }
  public rejectChallenge(userid: any, challengeid: any) {
    return this.http.delete<any>(reject_challenge + '/' + userid + '/' + challengeid);
  }
  public getChallengeDetails(challengeId: any) {
    return this.http.get<any>(get_challenge_details + '/' + challengeId);
  }
  public createChallenge(data: any) {
    return this.http.post<any>(create_challenge, data);
  }
  public updateChallenge(data: any) {
    return this.http.put<any>(update_challenge, data);
  }
  public deleteChallenge(id: any) {
    return this.http.delete<any>(delete_challenge + '/' + id);
  }
 
}
