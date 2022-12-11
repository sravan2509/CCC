import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../services/challenge/challenge.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';

@Component({
  selector: 'app-challanges',
  templateUrl: './challanges.component.html',
  styleUrls: ['./challanges.component.css']
})
export class ChallangesComponent implements OnInit {
  panelOpenState = false;
  public suggestions: any[] | undefined
  acceptChallenges: any;
  createdChallenges: any;
  userMail: string | null | undefined;
  constructor(public router: Router,private challengeService: ChallengeService) { }

  ngOnInit(): void {
    this.userMail = localStorage.getItem('userid')
    this.challengeService.getChallengeSuggestions().subscribe(
      (data) => {
        this.suggestions = data.response;
        console.log(this.suggestions)
      }
      , (err) => {
        console.log(err);
      }
    )
    this.challengeService.getUserChallenge().subscribe(
      (data:any)=>{
        console.log(data.response);
        
        this.acceptChallenges=data.response.filter((e:any)=>e.creatorid!=this.userMail)
        this.createdChallenges=data.response.filter((e:any)=>e.creatorid===this.userMail)
        console.log("accepted",this.acceptChallenges);
        console.log("created",this.createdChallenges);
        
        
      },
      (err)=>{
        console.log(err);
        
      }
    )
  }



  acceptChallenge(id: any) {
    var postObj = {
      'userid': this.userMail,
      'challengeid': id
    }
    this.challengeService.acceptChallenge(postObj).subscribe(
      (data : any) => {
        console.log(data);
        // this.router.navigate(['/challenges']);
        window.location.reload()
      }
      , (err : any) => {
        console.log(err);
      }
    )
  }
  rejectChallenge(challengeid: any) {
    var postObj = {
      "challengeid": challengeid,
      "userid": localStorage.getItem('userid')
    }
    this.challengeService.rejectChallenge(postObj['userid'], postObj['challengeid']).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate(['/challenges']);
      },
      (err : any) => {
        console.log(err);
      }
    )
  }
  editChallenge(challengeid: any) {
    this.router.navigate(['/challenge/edit', challengeid])
  }
  deleteChallenge(id: any) {
    this.challengeService.deleteChallenge(id).subscribe(
      (data : any) => {
        console.log(data);
        this.router.navigate(['/challenges']);
      },
      (err : any) => {
        console.log(err);
      }
    )
  }
  viewChallenge(id:any){
    this.router.navigate(['/challenge',id])
  }

}
