import { Injectable } from '@angular/core';
import { get_comment, update_comment, delete_comment, create_comment,get_All_Comments } from '../../config/serverurls';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }
  public getComment(commentid: any) {
  
    return this.http.get<any>(get_comment + '/' + commentid);
  }
  public updateComment(postObj: any) {
    return this.http.put<any>(update_comment, postObj);
  }
  public deleteComment(challengeId: any, commentid: any) {
    return this.http.delete<any>(delete_comment + '/' + challengeId + '/' + commentid);
  }
  public createComment(postObj: any) {
    return this.http.post<any>(create_comment, postObj);
  }
  public getAllComments(){
    return this.http.get<any>(get_All_Comments)
  }
}
