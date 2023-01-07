import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-solid fa-eye-slash";

  constructor() { }

  ngOnInit(): void {
  }

  hideShowPass(){
    this.isText=!this.isText;
    this.isText?this.type="text":this.type="password";
    this.isText?this.eyeIcon="fa-solid fa-eye":this.eyeIcon="fa-solid fa-eye-slash";
  }

}
