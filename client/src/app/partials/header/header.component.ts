import {Component, Input, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../admin/auth/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.clearStorage()
    this.authService.logoutUser()
    this.router.navigate([''])
  }
}
