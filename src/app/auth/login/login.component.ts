import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  errors : any[] = [];
  notifyMessage: string ='';

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();

    this.route.params.subscribe( (params) => {
      if(params['register']==='success'){
        this.notifyMessage = 'You have been succesfuly registered'
      }
    } );
  }

  initForm(){
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password:['', Validators.required]
    });
  }

  invalidForm(fieldName): boolean{
    return this.loginForm.controls[fieldName].invalid &&
          (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

  isRequired(fieldName): boolean{
    return this.loginForm.controls[fieldName].errors.required;
  }

  login(){
    this.auth.login(this.loginForm.value).subscribe(
      (token)=>{
        this.router.navigate(['/rentals']);
      },
      (err)=>{
        this.errors  = err.error.errors;
      }
    );
  }
}
