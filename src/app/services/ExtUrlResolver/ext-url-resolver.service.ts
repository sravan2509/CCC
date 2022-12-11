import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExtUrlResolverService implements Resolve<any> {
  constructor() { }
  url :any
  resolve(route: ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<any>
  {
    this.url =route.queryParamMap.get('url');
  window.location.href= this.url
  return of(null);
  }}