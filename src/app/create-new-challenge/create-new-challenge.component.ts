import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, FormArray , Validators } from '@angular/forms';
import { ChallengeService } from '../services/challenge/challenge.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-new-challenge',
  templateUrl: './create-new-challenge.component.html',
  styleUrls: ['./create-new-challenge.component.css']
})
export class CreateNewChallengeComponent implements OnInit {
  testcasesArray: FormArray | any;

  constructor(private challengeService: ChallengeService, private router: Router, private fb: FormBuilder, public route: ActivatedRoute) { }
  public isEdit = false;
  public challengeId: any
  ngOnInit(): void {
    if (this.router.url.indexOf('/edit') != -1) {
      this.isEdit = true;
      this.challengeId = this.route.snapshot.paramMap.get('id');
      this.challengeService.getChallengeDetails(this.challengeId).subscribe(
        (data : any) => {
          console.log(data)
          this.loadForm(data['response']);

        },
        (err:any) => {
          console.log(err);
        }
      )
    }
    
  }
  
  createChallengeForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    sampleInput: ['', Validators.required],
    sampleOutput: ['', Validators.required],
    testcasesArray: this.fb.array([this.addingTestCase()]),
  });

  addingTestCase(): FormGroup {
    return this.fb.group({
      input: '',
      output: ''
    });
  }
  addChallenge(): void {
    this.testcasesArray = this.createChallengeForm.get('testcasesArray') as FormArray;
    this.testcasesArray.push(this.addingTestCase());
    
  }

  get testcasesArrayFormGroups() {
    return this.createChallengeForm.get('testcasesArray') as FormArray
  }


  submit() {
    console.log(this.createChallengeForm.value);
    var postObj = {
      title: this.createChallengeForm.value.title,
      description: this.createChallengeForm.value.description,
      sampleInput: this.createChallengeForm.value.sampleInput,
      sampleOutput: this.createChallengeForm.value.sampleOutput,
      testcases: this.createChallengeForm.value.testcasesArray,
      creatorid: localStorage.getItem('userid')
    }
    console.log(postObj)
    this.challengeService.createChallenge(postObj).subscribe(
      (data:any) => {
        console.log(data);
        this.router.navigate(['/challanges']);
      },
      (err:any) => {
        console.log(err);
      }
    )
  }


  loadForm(formData :any){
    this.createChallengeForm.patchValue({
      title : formData['title'],
      description : formData['description'],
      sampleInput : formData['sampleInput'],
      sampleOutput : formData['sampleOutput'],
    })

    for(let task in formData.testcases){
     const control=<FormArray>this.createChallengeForm.get('testcasesArray')
     control.push(this.addingTestCase())

    }
    var remove : any=<FormArray>this.createChallengeForm.get('testcasesArray')
    remove.removeAt(remove.length -1)
    console.log(this.createChallengeForm.value, formData);

    console.log(this.createChallengeForm.value);

  

     this.createChallengeForm.patchValue({
      testcasesArray : formData['testcases']

     })

  }

  public updateChallenge() {

    var postObj = {
      title: this.createChallengeForm.value.title,
      description: this.createChallengeForm.value.description,
      sampleInput: this.createChallengeForm.value.sampleInput,
      sampleOutput: this.createChallengeForm.value.sampleOutput,
      testcases: this.createChallengeForm.value.testcasesArray,
      challengeId : this.challengeId,
      creatorid: localStorage.getItem('userid')
    }

  console.log(this.createChallengeForm.value);
  console.log(postObj);
  

    this.challengeService.updateChallenge(postObj).subscribe(
      (data : any) => {
        console.log(data,"hi");
        this.router.navigate(['/challanges']);
      },
      (err:any) => {
        console.log(err);
      }
    )
  }

}
