import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './models/user';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private commonService: CommonService) {}
  
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
        //this.showWarning(res.statusText);
      } else {
        //this.isProjAdmin(res.user.userId);  // this method does router navigation as well.
      }
    },
    (error: any) => {
      //this.showConfirm();
    });
    //this.authService.login(this.loginForm.value);
    //this.router.navigateByUrl('/admin');
  }
}
