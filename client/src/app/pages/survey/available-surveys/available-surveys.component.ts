import { Component, OnInit } from '@angular/core';
import { CrudHttpService } from '../crud/crud-http.service';
import { AuthService } from "../../../admin/auth/auth.service";

@Component({
  selector: 'app-available-surveys',
  templateUrl: './available-surveys.component.html',
  styleUrls: ['./available-surveys.component.css']
})
export class AvailableSurveysComponent implements OnInit {
  surveyList:any = [];

  constructor(public authService: AuthService, private crudHttpService: CrudHttpService) { }

  ngOnInit(): void {
    this.listSurveys();
  }

  listSurveys(){
    this.crudHttpService.listAvailableSurveys().subscribe((response)=>{
      this.surveyList = response;
    },(error=>{

    }));
  }

}
