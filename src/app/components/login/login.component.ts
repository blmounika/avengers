import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CommonService } from 'src/app/services/common.service';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private commonService: CommonService, private dialog: MatDialog, private router: Router) {}
  invalidCredentials = false;
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    pwd: new FormControl('', [
      Validators.required]),
  });

  get formControls() { return this.loginForm.controls; }

  login() {
    if(this.loginForm.invalid){
      return;
    }
    let userObj: User = Object.assign({}, this.loginForm.value);
    this.commonService.postData('/user/login', userObj).subscribe(
      (res: any) => {
      if (res.status === 'Error') {
        this.invalidCredentials = true;
      } else {
        this.invalidCredentials = false;
        this.router.navigate(['project']);
      }
    },
    (error: any) => {
      //this.showConfirm();
    });
  }

  openUserRegDialog() {
    this.dialog.open(UserRegistrationComponent);
  }

}