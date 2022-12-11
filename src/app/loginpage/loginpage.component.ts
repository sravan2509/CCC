import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { OAuthService } from '../services/oauth/oauth.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
})

export class LoginpageComponent implements OnInit {

 
  loginForm!:FormGroup;
  submitted=false
  public alreadyUser = true
 
  constructor(public _userdata: UserService, public router: Router, private loginService: LoginService,private serv:OAuthService) { }

  ngOnInit(){
   
    this.loginForm=  new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
  
    });

    // this.serv.GetAuthPage().subscribe((data : any)=>this.AuthUrl=data["authUrl"],(err:any)=>{console.log(err)});
  }


  // gitlogin(){
  //   this.router.navigate(['/test'],{queryParams:{url:this.AuthUrl}});
  //   }

  public errData: any =''


  
  userLogin() {
    var postObj = {
      // "name": this.userForm.value.username,//pass name,
      "emailid": this.loginForm.value.email,//pass email id
      "password": this.loginForm.value.password //pass password
    }
    console.log(postObj)
    this.loginService.login(postObj).subscribe(
      (data: any) => {
        console.log(data);
        this.errData = data;
        if (this.errData.message == 'user doesnot have account') {
          this.alreadyUser = false
        }
        else if (this.errData.message == 'ok') {
          this.alreadyUser = true;
          console.log(data)
          localStorage.setItem('userid', data.userid);
          localStorage.setItem('username', data.username);
          this.router.navigate(['/dashboard']);
        }
      },
      (err) => {
        console.log(err);
      }
    )

  }



  

}
