import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { DiffEditorModel, NgxEditorModel } from 'ngx-monaco-editor';
import { login } from '../config/serverurls';
import { ChallengeService } from '../services/challenge/challenge.service';
import { FiddleService } from '../services/fiddle/fiddle.service';
// import { UserService } from 'src/app/services/user.service';
// const {c, cpp, node, python, java} = require('compile-run');

@Component({
  selector: 'app-codeeditor',
  templateUrl: './codeeditor.component.html',
  styleUrls: ['./codeeditor.component.css']
})
export class CodeeditorComponent implements OnInit {
  challengeId: any;
  challengeDetails: any;
  rotuer: any;

  fiddleid:any = null;
  fiddle:any ={name:null,language:null,code:null};
  stdin:any = '';
  count=0

  constructor(public route: ActivatedRoute,private challengeService: ChallengeService,public fiddleService:FiddleService) { }

  ngOnInit(): void {
    this.challengeId = this.route.snapshot.paramMap.get('id');
    this.challengeService.getChallengeDetails(this.challengeId).subscribe(
      (data:any)=>{
        console.log(data.response);
        this.challengeDetails = data.response
        this.stdin = data.response.sampleInput
      },
      (err:any)=>{
        console.log(err);
      }
    )

    // this.fiddleid =  this.route.snapshot.paramMap.get('fiddleid');
    // console.log(this.fiddleid)
    this.fiddleService.getFiddleData(this.challengeId).subscribe(
      (res:any)=>{
        console.log(res.response)
      this.fiddle = res.response;
      this.code = this.fiddle.code;
      this.editorOptions.language = this.fiddle.language;
      this.fiddleid=this.fiddle.fiddleid
      console.log(this.fiddle);
    },
    (err: any)=>{
      console.log(err);
    }
    )
  }

  
  

  editorOptions = {theme: 'vs-dark', language: 'python'};
  code: string= '#code here';
  stdout = "Run the code to get the output";



  // onInit(editor: { getPosition: () => any; }) {
  //   let line = editor.getPosition();
  //   console.log(line);
  // }

  save(){
    // this.fiddle.code = this.code;
    this.fiddle={
      code : this.code,
      language : "python",
      name: "name",
      userid: localStorage.getItem('userid'),
      challengeid:this.challengeId
    }
    if(this.fiddleid){
      this.fiddle["fiddleid"]=this.fiddleid
      this.fiddleService.updateFiddle(this.fiddle).subscribe(
        (res:any)=>{
        console.log(res);
      },(err:any)=>{
        console.log(err);
      });
    }
    else{
      this.fiddleService.saveFiddle(this.fiddle).subscribe(
        (res:any)=>{
        console.log(res);
      },(err:any)=>{
        console.log(err);
      });
    }

    
  }

  delete(){
    this.fiddleService.deleteFiddle(this.fiddle.fiddleid).subscribe(
      (_: any)=>{
      this.rotuer.navigate(['/home']);
    },(err:any)=>{
      console.log(err);
    });
  }

  run(){
    let opts = {
      script: this.code,
      stdin : this.stdin,
      language: 'python'
    };
    this.fiddleService.runFiddle(opts).subscribe(
      (res)=>{
      console.log(res);
      if(res.stderr == ""){
        this.stdout = res.stdout;
      }
      else{
        this.stdout = res.stderr
      }
      
      console.log(this.stdout);
      
    },(err: any)=>{
      console.log(err);
    });
  }

   submit(){
    this.save()
    let total=this.challengeDetails.testcases.length
    this.count=0
    let outputPromiseArr = []
    this.stdout=''
    for(let i=0;i<this.challengeDetails.testcases.length;i++){
      
      let opts = {
        script: this.code,
        stdin : this.challengeDetails.testcases[i].input,
        language: 'python'
      };
      // outputPromiseArr.push(this.fiddleService.runFiddlenew(opts))
      
      this.fiddleService.runFiddle(opts).subscribe(
        (res) => {
          console.log(res.stdout.split('\r')[0], this.challengeDetails.testcases[i].output);
          if (res.stdout.split('\r')[0].toString() == this.challengeDetails.testcases[i].output.toString()) {
            this.count++;
            console.log("hi", this.count);

          }
          else{
            this.stdout=`some of the private testcase(s) failed. \n`
          }
        }, (err: any) => {
          console.log(err);
        });
        this.stdout='Successfully submitted.'
    }
    // Promise.all(outputPromiseArr).then((resps)=>{
    //   console.log(resps)
      
      
    // }).catch(console.error)
    console.log(this.count,"sdfhb123");
    // this.stdout=`${this.count}/${total} Private testcases passed`
  }
 


}
