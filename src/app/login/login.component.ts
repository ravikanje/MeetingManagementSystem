import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../service/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin: boolean;
  constructor(private formBuilder: FormBuilder ,  private router: Router, private apiService: ApiService ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }
  // authenticatioin process starts on click of login
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    // prep login object to be sent for authentication
    const loginObject = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    };
    // web api call to authenticate the logged in user
    this.apiService.login(loginObject).subscribe(data => {
       if ( data.status === 200 ) {
        this.router.navigate(['meeting-list']);
      } else {
        this.invalidLogin = true;
        alert('Invalid User!');
      }
    });
  }
}
