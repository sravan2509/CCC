import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { UserService } from './user.service';
import { create_fiddles, get_fiddles, get_fiddle_data, run_fiddle, save_fiddle, delete_fiddle } from '../../config/serverurls';


@Injectable({
  providedIn: 'root'
})
export class FiddleService {

  constructor(private http:HttpClient) { }

  public newFiddle(){
    return this.http.post<any>(create_fiddles , { userid: localStorage.getItem('userid')});
  }
  public getFiddles(){
    return this.http.get<any>(get_fiddles + '/' + localStorage.getItem('userid'));
  }
  public getFiddleData(challengeid:any){
    return this.http.get<any>(get_fiddle_data+'/' + localStorage.getItem('userid')+ '/' + challengeid);
  }
  public runFiddle(opts:any){
    console.log(opts);
    
    return this.http.post<any>(run_fiddle , opts);
  }
  public runFiddlenew(opts:any):Promise<object>{
    return new Promise((resolve, reject)=>{
      this.http.post(run_fiddle, opts).subscribe(
        res=>{

          resolve(res);
        },
        err =>{
          reject(err);
        }
      );
    });
  }
  public saveFiddle(fiddleObj:any){
    return this.http.post(save_fiddle , fiddleObj);
  }
  public updateFiddle(fiddleObj:any){
    return this.http.put(save_fiddle+ '/' +fiddleObj.fiddleid, fiddleObj)
  }
  public deleteFiddle(fiddleid:any){
    return this.http.delete(delete_fiddle+ '/' + fiddleid );
  }
}
