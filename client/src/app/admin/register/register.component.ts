import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string = '';
  password: string = '';
  email: string = '';
  displayName: string = '';

  user: User = {
    username: this.username,
    password: this.password,
    email: this.email,
    displayName: this.displayName
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.user = {
      username: this.username,
      password: this.password,
      email: this.email,
      displayName: this.displayName
    }

    if (
      this.user.username === "" ||
      this.user.password === "" ||
      this.user.displayName === "" ||
      this.user.email === ""
    ) {
      alert("All Fields Are required")
      this.router.navigate(['/register'])
    } else {
      this.authService.registerUser(this.user).subscribe(() => {
        console.log(`user registration success: ${ this.user }`);
        this.router.navigate(['login']);
      }, (error) => {
        console.log(`Error: ${ error }`);
      })
    }
  }

  back() {
    this.router.navigate([''])
  }
}
