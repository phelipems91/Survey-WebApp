import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { AuthService } from '../../admin/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user!: User
  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.validate(this.username, this.password).subscribe((user) => {
      this.authService.setUserInfo(user)
      this.router.navigate(['/home'])
    }, (error) => {
      console.log(`Error Login: ${ error }`)
    })
  }

}
