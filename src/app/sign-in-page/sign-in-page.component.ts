import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder } from '@angular/forms';
import { SignupService } from '../services/auth/signup.service';

import { SocialAuthService,GoogleLoginProvider,SocialUser } from "@abacritt/angularx-social-login";


@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit {
signinForm!:FormGroup;
submitted=false

user: SocialUser | undefined;
loggedIn: boolean | undefined;

  constructor(
    private _userdata: UserService,
    public router: Router,
    private fb: FormBuilder,
    private authService: SignupService,
    private socialauthService: SocialAuthService) { }
  
  ngOnInit(){
    this.signinForm=this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      phoneno: [''],
      dob: [''],
      gender: [''],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
      }),
    });


    this.socialauthService.authState.subscribe((user:any) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
      localStorage.setItem('username', user.firstName)
          localStorage.setItem('userid', user.email)
          this.router.navigate(['/dashboard']);

          var postObj = {
            "name": this.user?.firstName,//pass name,
            "emailid": this.user?.email,//pass email id
            "password": this.user?.lastName //pass password
          }
          this.authService.signup(postObj).subscribe(
            (data) => {
      
              console.log(data);
              this.errData = data;
      
              if (this.errData.message == 'account exists') {
                this.alreadyUser = true
              }
             
            },
            (err) => {
              console.log(err);
            }
          )
      
    });
    
  }
  get signinFormControl() {
    return this.signinForm.controls;
  }

  public alreadyUser = false;

  // signup() {
  //   let result = false;
  //   for (let index = 0; index < this._userdata.users.length; index++) {
  //     if (
  //       this.signinForm.value.name ==
  //       this._userdata.users[index]['firstname'] &&
  //       this.signinForm.value.email == this._userdata.users[index]['email'] &&
  //       this.signinForm.value.password == this._userdata.users[index]['password']
  //     ) {
  //       result = true;
  //     }
  //   }

  //   if (result) {
  //     this.alreadyUser = true;
  //   } else {
  //     this._userdata.users.push(this.signinForm.value);
  //     this._userdata.currentUser = this.signinForm.value;
  //     this.router.navigate(['/dashboard']);
  //   }
  // }
  signInWithGoogle(): void {
    // this.socialauthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialauthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => console.log("logged in")
      );
  
  }
  refreshToken(): void {
    this.socialauthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }


  public errData: any

  signUp() {
    var postObj = {
      "name": this.signinForm.value.name,//pass name,
      "emailid": this.signinForm.value.email,//pass email id
      "password": this.signinForm.value.password //pass password
    }
    console.log(postObj);

    this.authService.signup(postObj).subscribe(
      (data) => {

        console.log(data);
        this.errData = data;

        if (this.errData.message == 'account exists') {
          this.alreadyUser = true
        }
        else {
          localStorage.setItem('username',postObj.name)
          localStorage.setItem('userid', data.userid)
          this.router.navigate(['/dashboard']);
        }
      },
      (err) => {
        console.log(err);
      }
    )
    
  }
}
