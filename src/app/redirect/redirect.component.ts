import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { OAuthService } from '../services/oauth/oauth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  constructor(private active:ActivatedRoute,private serv:OAuthService,private router:Router) { }
  ngOnInit() {
  this.active.queryParamMap.pipe(concatMap((x:any)=>this.serv.getAcessToken(x.get('code')) )).subscribe((data:any)=>this.router.navigate(['/dashboard']),(err:any)=>{console.log(err)});
  }
  }