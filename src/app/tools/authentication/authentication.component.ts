import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from "firebasets/firebasetsAuth/firebaseTSAuth";
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';



@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  state=AuthenticationCompState.LOGIN;
  firebasetsAuth:FirebaseTSAuth;
  
  
         
  constructor(private bottonSheetRef:MatBottomSheetRef){ 
     this.firebasetsAuth=new FirebaseTSAuth();
  }
  ngOnInit(): void {
    
  }
  onRegisterClick(registerEmail:HTMLInputElement,registerPassword:HTMLInputElement,registerconfirmpassword:HTMLInputElement){
     let email=registerEmail.value;
     let password=registerPassword.value;
     let confirmpassword=registerconfirmpassword.value;
     if(this.isNotEmpty(email) && this.isNotEmpty(password) && this.isMatch(password,confirmpassword)){
      this.firebasetsAuth.createAccountWith({
        email:email,
        password:password,
        onComplete:(uc)=>{
          this.bottonSheetRef.dismiss();
          
  
        },
        onFail:(err)=>{
         alert("failed");
        }
       })

     }
   ;
  }
  onLogin(loginEmail:HTMLInputElement,loginPassword:HTMLInputElement){
    let email=loginEmail.value;
    let password=loginPassword.value;
    if(this.isNotEmpty(email),this.isNotEmpty(password)){
      this.firebasetsAuth.signInWith({
        email:email,
        password:password,
        onComplete:(uc)=>{
          this.bottonSheetRef.dismiss();

        },
        onFail:(err)=>{
          alert("error login");

        }
        
      })
    }
    

  }
  onReset(resetEmail:HTMLInputElement){
    let email=resetEmail.value;
    if(this.isNotEmpty(email)){
      this.firebasetsAuth.sendPasswordResetEmail({
        email:email,
        onComplete:(err)=>{
          this.bottonSheetRef.dismiss();
        }
      })
    }
  }
  isNotEmpty(text:string){
    return text!=null && text.length>0;

  }
  isMatch(text:string,comparewith:string){
    return text==comparewith;

  }
  OnForgotPasswordClick(){
    this.state=AuthenticationCompState.FORGOT_PASSWORD;

  }
  OnCreateAccountClick(){
    this.state=AuthenticationCompState.REGISTER

  }
  onLoginClick(){
    this.state=AuthenticationCompState.LOGIN

  }
  isLoginState(){
    return this.state==AuthenticationCompState.LOGIN;

  }
  isRegisterState(){
    return this.state==AuthenticationCompState.REGISTER;
  }
  isForgotPassword(){
    return this.state==AuthenticationCompState.FORGOT_PASSWORD;
  }
  getStateText(){
    switch(this.state){
      case AuthenticationCompState.LOGIN:
        return "Login";
      case AuthenticationCompState.REGISTER:
        return "Register";
      case AuthenticationCompState.FORGOT_PASSWORD:
        return "Forgot Password";
    }
  }


}
export enum AuthenticationCompState{
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}
