import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  messageClass;
  message;
  processed = false;
  form:FormGroup;


  constructor(private formBuilder: FormBuilder) { }

  createForm(){
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  enableForm(){
      this.form.controls['username'].enable();      
      this.form.controls['password'].enable();      
    }

    disableForm(){
      this.form.controls['username'].disable()      
      this.form.controls['password'].disable();      
    }

  ngOnInit() {
  }

  onLoginSubmit(){
    this.processed = true;
    this.disableForm();

    //Crea el usuario con los valores de los input

    const user={
      username : this.form.get('username').value,
      password : this.form.get('password').value
    }
  }

}
