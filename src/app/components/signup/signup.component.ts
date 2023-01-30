import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-solid fa-eye-slash";
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router:Router) { }


  ngOnInit(): void {

    this.signupForm=this.fb.group({

      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required],
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
    if(this.signupForm.valid){
      console.log(this.signupForm.value);
      this.auth.signUp(this.signupForm.value).subscribe({
        next:(res)=>{
          alert(res.message)
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        error:(err)=>{
          alert(err.error.message)
        }
      });
    }
    else{
      console.log('this is not valid');
      ValidateForm.validateAllFormFields(this.signupForm);
      //this.validateAllFormFields(this.signupForm);
      alert('form is not valid');
    }
  }
}
