import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CommentsService } from '../services/comments/comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthService } from '../services/oauth/oauth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
// export class DashboardComponent implements OnInit {
  
//   constructor() { 
    
//   }


// }
export class DashboardComponent implements AfterViewInit{
  challengeId: any;
  userId: any = localStorage.getItem("userid")
  public allComments: any = [];
  public localUserName :any  =localStorage.getItem("username")

  constructor( public router: Router, public commentService: CommentsService,private active:ActivatedRoute,private serv:OAuthService){}
 
  username:string | undefined;

  ngOnInit(): void {
// ************************************************************************************
    this.serv.getUserDetails().subscribe((data:any)=>this.username=data["login"],(err:any)=>{console.log(err)});
// ************************************************************************************


  this.commentService.getAllComments().subscribe(
      (data:any)=>{this.allComments=data.response;console.log(this.allComments);
      },
     (err:any)=>{console.log(err)})

  }
 
  // **********************************************
  logout(){
    this.serv.logout().subscribe(data=>this.router.navigate(['/login']),err=>{console.log(err)});
    }
// ***********************************************************************
  async loadComments(challengeObj: any) {
    console.log(challengeObj)
    for (let id of challengeObj['commentids']) {
      this.allComments.push(await this.getComment(id));
      console.log("*****comments****", this.allComments);
    }
  }
  updatecomment(commentid: any, description: any) {
    var postObj = {
      "commentid": commentid,
      "description": description
    }
    this.commentService.updateComment(postObj).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  public currComment: any
  public commentarr: any = [];
  createComment() {
    var postObj = {
      "userid": localStorage.getItem('userid'),
      "challengeId": this.challengeId,
      "description": this.currComment,
      "username":localStorage.getItem('username')
      //pass the comment
    }
    console.log(postObj);
    
    this.commentService.createComment(postObj).subscribe(
      (data) => {
        console.log(data);
        this.allComments.push({description:postObj['description'],userid : this.userId,"username":this.localUserName})
        this.currComment = ''
      },
      (err) => {
        console.log(err);
      }
    )
    
  }

  deleteComment(commnetId: any, index: any) {
    console.log(this.challengeId,"    ",commnetId)
    this.commentService.deleteComment(this.challengeId, commnetId).subscribe(
      (data) => {
        console.log(data);
        this.allComments.splice(index, 1);
      },
      (err) => {
        console.log(err);
      }
    )
  }
  getComment(commentid: any) {
    return new Promise((resolve, reject) => {
      this.commentService.getComment(commentid).subscribe(
        (data) => {
          resolve(data.response);
        },
        (err) => {
          reject(err);
        }
      )
    })
  }
  
  displayedColumns: string[] = ['Rank', 'Student', 'Score', 'Comments'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
  export interface PeriodicElement {
    Student: string;
    Rank: number;
    Score: number;
    Comments: number;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
    {Rank: 1, Student: 'Pooja', Score: 200, Comments: 4},
    {Rank: 2, Student: 'Charan', Score: 180, Comments: 3},
    {Rank: 3, Student: 'Divya', Score: 160, Comments: 0},
    {Rank: 4, Student: 'Bhavya', Score: 150, Comments: 5},
    {Rank: 5, Student: 'Chandana', Score: 130, Comments:2},
    {Rank: 6, Student: 'Dheeraj', Score: 120, Comments: 4},
    {Rank: 7, Student: 'Subhakar', Score: 100, Comments: 0},
    {Rank: 8, Student: 'Sravan', Score: 100, Comments: 0},
    {Rank: 9, Student: 'Varma', Score: 90, Comments: 3},
    {Rank: 10, Student: 'Devi Prasad', Score: 80, Comments: 1},
    {Rank: 11, Student: 'Sudarshan', Score: 70, Comments: 2},
    {Rank: 12, Student: 'Divya sri', Score: 60, Comments: 2},
    {Rank: 13, Student: 'Sricharan', Score: 50, Comments: 4},
    {Rank: 14, Student: 'Keerthi', Score: 50, Comments:3},
    {Rank: 15, Student: 'Bhavya sri', Score: 40, Comments:3},
    {Rank: 16, Student: 'Chandu', Score: 30, Comments:0},
    {Rank: 17, Student: 'Pooja', Score: 30, Comments: 0},
    {Rank: 18, Student: 'Ishaan', Score: 20, Comments: 2},
    {Rank: 19, Student: 'Advait', Score: 10, Comments: 3},
    {Rank: 20, Student: 'Pooja', Score: 10, Comments: 5},
  ];
  
 
