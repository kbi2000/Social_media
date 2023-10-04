import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { PostfeedComponent } from './pages/postfeed/postfeed.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"emailVerification",component:EmailVerificationComponent},
  {path:"postfeed",component:PostfeedComponent},
  {path:"**",component:HomeComponent}
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
