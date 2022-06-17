import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser: User | undefined;
  user = new BehaviorSubject({});

  constructor() { 
    const user= localStorage.getItem("user");
    if (user) {
      this.loggedInUser = JSON.parse(user);
    }
  }


  login(user: User) {
    this.loggedInUser = user;
    this.user.next(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return this.loggedInUser;
  }

  logout() {
    this.loggedInUser = undefined;
    this.user.next({});
    localStorage.removeItem("user");
  }
}
