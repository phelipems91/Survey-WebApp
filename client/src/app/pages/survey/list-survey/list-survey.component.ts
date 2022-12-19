import { Component, OnInit } from '@angular/core';
import { CrudHttpService } from '../crud/crud-http.service';
import { AuthService } from "../../../admin/auth/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-survey',
  templateUrl: './list-survey.component.html',
  styleUrls: ['./list-survey.component.css']
})
export class ListSurveyComponent implements OnInit {
  surveyList:any = [];

  constructor(public authService: AuthService, private crudHttpService: CrudHttpService, private router: Router) { }

  ngOnInit(): void {
    this.listSurveys();
  }

  listSurveys(){
    let owner = this.authService.authenticatedUser();

    this.crudHttpService.listSurveys(owner).subscribe((response)=>{
      this.surveyList = response;
    },(error=>{

    }));
  }

  deleteSurvey(id: any){
    this.crudHttpService.deleteSurvey(id).subscribe((result) => {
      
    });
    window.alert("Survey Deleted!");
    window.location.reload();
  }
}
