import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, private router: Router) { 
    this.authService.user.subscribe(user => {
      console.log(user);
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  logout() {
    this.router.navigate(['']);
    this.authService.logout();
  }

}
