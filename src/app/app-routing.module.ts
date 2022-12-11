import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallangesComponent } from './challanges/challanges.component';
import { CodeComponent } from './code/code.component';
import { CodeeditorComponent } from './codeeditor/codeeditor.component';
import { CreateNewChallengeComponent } from './create-new-challenge/create-new-challenge.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GitAuthComponent } from './git-auth/git-auth.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { ProfileComponent } from './profile/profile.component';
import { RedirectComponent } from './redirect/redirect.component';
import { ExtUrlResolverService } from './services/ExtUrlResolver/ext-url-resolver.service';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  
  {path:'signup',component:SignInPageComponent},
  {path:'login',component:LoginpageComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'code',component:CodeComponent},
  {path:'challanges',component:ChallangesComponent},
  {path:'profile',component:ProfileComponent},
  {path:'user-profile',component:UserProfileComponent},
  // {path:'codeeditor',component:CodeeditorComponent},
  {path:'challenge/:id',component:CodeeditorComponent},
  {path:'create-challenge', component:CreateNewChallengeComponent},
  {path:'challenge/edit/:id', component:CreateNewChallengeComponent},
  {path:'redirect', component:RedirectComponent},
  {path: 'test',component: GitAuthComponent,
    resolve: {
    url: ExtUrlResolverService
    }
    },
  {path:'',pathMatch:'full',component:LoginpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[SignInPageComponent,CreateNewChallengeComponent,LoginpageComponent,DashboardComponent,CodeComponent,ChallangesComponent,ProfileComponent,CodeeditorComponent,UserProfileComponent,GitAuthComponent,RedirectComponent]
