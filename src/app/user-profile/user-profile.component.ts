import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserService1 } from '../services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from '../config/serverurls';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
 

  constructor(
    public _userdata: UserService,
    public router: Router,
    private fb: FormBuilder,
    private userservice: UserService1,
    private http: HttpClient
  ) { }

  public userDetails: any[] | undefined
  public isLoaded = false;
  public serverUrl = serverUrl;
  public name = this._userdata.currentuser;
  public coverPic = this._userdata.coverPic;
  public profileUrl: any;
  profileForm = this.fb.group({
    firstName : [''],
    lastName : [''],
    email:[''],
    phoneno:[''],
    dob:[''],
    gender:[''],
    street:[''],
    city:[''],
    state:[''],
    zip:[''],
  });

  // public name = this._userdata.currentuser;
  // public coverPic = this._userdata.coverPic;

  // onSubmit() {
  //   this._userdata.currentUser = this.profileForm.value;
  // }

  userObj: any;
  userData = [];
  onSubmit() {
    this._userdata.currentUser = this.profileForm.value;
  }
  ngOnInit(): void {
    this.profileForm.controls['email'].disable();
    this.userservice.getUserDetails().subscribe(
      (data:any) => {
        console.log('current user data', data.response);
        this.userObj = data.response;
        if(this.userObj['profilepicture']==''){
          this.profileUrl="../../assets/images/hero graphics.png";
        }
        else{
          this.profileUrl=`${this.serverUrl}/user/get-image?name=${this.userObj['profilepicture']}`
        }
        this.loadFormData(data.response);
        this.isLoaded = true;
      },
      (err:any) => {
        console.log(err);
      }
    );
  }
  loadFormData(data: any) {
    this.profileForm.patchValue({
      email : data.emailid,
      phoneno : data.phonenumber,
      gender : data.gender,
      dob : data.dateofbirth,
      street : data.street,
      city : data.city,
      state : data.street,
      zip : data.zipcode
    });
  }

  updateProfile(){
    var postObj = {
      userid : localStorage.getItem('userid'),
      phonenumber : this.profileForm.value.phoneno,
      dateofbirth : this.profileForm.value.dob,
      gender : this.profileForm.value.gender,
      street : this.profileForm.value.street,
      city : this.profileForm.value.city,
      state : this.profileForm.value.state,
      zipcode: this.profileForm.value.street
    }
    this.userservice.updateUserDetails(postObj).subscribe(
      (data: any) => {
        console.log(data);
        location.reload();
      },
      (err: any) =>{
        console.log(err)
      }
      )
  }

  deleteAccount() {
    this.userservice.deleteAccount().subscribe(
      (data: any) => {
        console.log(data);
        localStorage.clear();
        window.location.replace(`http://localhost:4200/login`)

      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  selectimage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.profileUrl= event.target.result;
      };
      reader.readAsDataURL(file);
      const formdata = new FormData();
      formdata.append('file', file);
      formdata.append('userid', JSON.stringify(localStorage.getItem('userid')));
      this.http.post<any>(serverUrl + '/user/image-upload', formdata).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => console.log(error)
      );
    }
  }
  

}
