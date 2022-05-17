import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  constructor(private commonService: CommonService, public dialogRef: MatDialogRef<UserRegistrationComponent>) { }
  
  userForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required]),
    lastName: new FormControl('', [
      Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    pwd: new FormControl('', [
      Validators.required]),
    address: new FormControl('', [
      Validators.required]),
    pinCode: new FormControl('', [
      Validators.required]),
    phoneNum: new FormControl('', [
      Validators.required]),
    altPhoneNum: new FormControl(''),
  });

  ngOnInit(): void {
  }

  saveUser() {
    if(this.userForm.invalid){
      return;
    }
    let userObj: User = Object.assign({}, this.userForm.value);
    this.commonService.postData('/user/register', userObj).subscribe(
      (res: any) => {
      if (res.status === 'Error') {
        //this.showWarning(res.statusText);
      } else {
        this.dialogRef.close();
      }
    },
    (error: any) => {
      //this.showConfirm();
    });
  }

  get formControls() {
    return this.userForm.controls;
  }

}
