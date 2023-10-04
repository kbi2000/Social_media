import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticationComponent } from './tools/authentication/authentication.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Social_media';
  auth=new FirebaseTSAuth();
  firestore=new FirebaseTSFirestore();
  isLoggedIn=false;
  userHasProfile=true;
  private static userDocument: UserDocument | undefined;
  constructor (private login:MatBottomSheet,private router:Router){
    this.auth.listenToSignInStateChanges(
      user=>{
      this.auth.checkSignInState(
        {
          whenSignedIn:user=>{
          

          },
          whenSignedOut:user=>{
            AppComponent.userDocument=undefined;
        

          },
          whenSignedInAndEmailNotVerified:user=>{
            this.router.navigate(["emailVerification"]);
            this.isLoggedIn=true
            

          },
          whenSignedInAndEmailVerified:user=>{
            this.getUserProfile();

          },
          whenChanged:user=>{

          }

        }
      );  
      }
    );
  }
  getUsername(): string {
    return AppComponent.userDocument?.publicName ?? '';
  }
  public static getUserDocument(){
    return AppComponent.userDocument;
  }
  getUserProfile(){
    return new Promise<number>(
      (resolved, rejected) => {
        this.firestore.listenToDocument(
          {
            name: "Getting Document",
            path: ["Users", this.auth.getAuth().currentUser?.uid||"default-value"],
            onUpdate: (result) => {
              AppComponent.userDocument = <UserDocument>result.data();
              this.userHasProfile = result.exists; 
              AppComponent.userDocument.userId=this.auth.getAuth().currentUser?.uid?? '';
              if(this.userHasProfile) {
                this.router.navigate(["postfeed"]);
                resolved(1);
              } else {
                resolved(0);
              }
              
              
              
            
            }
          }
        );
      }
    );
  }
  loggedIn(){
    return this.auth.isSignedIn();

  }
  onLoginClick(){
    this.login.open(AuthenticationComponent);


  }
  onLogOutClick(){
    this.auth.signOut();
  }

  
}

export interface UserDocument {
  publicName: string;
  description: string;
  userId: string;
}