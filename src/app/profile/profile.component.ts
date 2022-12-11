import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormControlStatus,FormGroup,Validators} from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  onFileSelected(event:any){
    console.log(event)
  }
profileForm!:FormGroup
submitted=false
  constructor(private fb:FormBuilder) { }
  ngOnInit(){
    this.profileForm=this.fb.group({
      // name:['',[Validators.required,Validators.minLength(6)]],
      email:['',[Validators.required,Validators.email]],
      // password:['',Validators.required,Validators.minLength(8), Validators.maxLength(10)]
      dob:['',[Validators.required]],
      phone:['',[Validators.required]],
      gender:['',[Validators.required]],
      street:['',[Validators.required]],
      city:['',[Validators.required]],
      zipcode:['',[Validators.required]],
      state:['',[Validators.required]]

    });
  }
  get profileFormControl() {
    return this.profileForm.controls;
  }
onSubmit(){
  this.submitted=true
  if(this.profileForm.valid){
    return
  }

}


}
