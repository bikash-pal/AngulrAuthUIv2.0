import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-solid fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })

  }
  hideShowPass(){
    this.isText=!this.isText;
    this.isText?this.type="text":this.type="password";
    this.isText?this.eyeIcon="fa-solid fa-eye":this.eyeIcon="fa-solid fa-eye-slash";
  }

  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{
          alert(res.message)
          this.loginForm.reset();
          this.router.navigate(['dashboard'])
        },
        error:(err)=>{
          alert(err.error.message)
        }
      });
    }
    else{
      console.log('this is not valid');
      //this.validateAllFormFields(this.loginForm);
      ValidateForm.validateAllFormFields(this.loginForm);
      alert('form is not valid');
    }
  }
}
