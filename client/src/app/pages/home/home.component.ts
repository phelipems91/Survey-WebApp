import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from "../../partials/base-page/base-page.component";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../admin/auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BasePageComponent implements OnInit {

  constructor(route: ActivatedRoute, public authService: AuthService) {
    super(route);
  }

  // ngOnInit(): void {
  // }

}
