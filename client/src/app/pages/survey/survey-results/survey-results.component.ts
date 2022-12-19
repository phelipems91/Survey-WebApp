import { Component, OnInit } from '@angular/core';
import { CrudHttpService } from '../crud/crud-http.service';
import { AuthService } from "../../../admin/auth/auth.service";
import jsPDF from 'jspdf';
import Html2Canvas from 'html2canvas';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.css']
})
export class SurveyResultsComponent implements OnInit {
  surveyList: any = [];
  responses: any = []

  constructor(private crudHttpService: CrudHttpService, public authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.listSurveys();
  }

  exportAsPDF(divId: any)
    {
        let data = document.getElementById(divId.parentNode.parentNode.id)!;  
        Html2Canvas(data).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'cm', 'a4');
        pdf.addImage(contentDataURL, 'PNG', 0, 0, 10, 15);  
        pdf.save('Survey_Result.pdf');   
      }); 
    }

  listSurveys(){
    let owner = this.authService.authenticatedUser();

    this.crudHttpService.listSurveys(owner).subscribe((response)=>{
      this.surveyList = response;

      for(let survey of this.surveyList){
        this.crudHttpService.listResponsesBySurvey(survey._id).subscribe((r)=>{
          survey['totalResponses'] = r;
        });
        for(let question of survey.questions){
          if(question.questionType === "multipleChoice"){
            this.crudHttpService.listResponsesByQuestion(survey._id , question._id, question.optionA).subscribe((r)=>{
              question['responseA'] = Math.round((r/survey.totalResponses)*100);
            });
            this.crudHttpService.listResponsesByQuestion(survey._id , question._id, question.optionB).subscribe((r)=>{
              question['responseB'] = Math.round((r/survey.totalResponses)*100);
            });
            this.crudHttpService.listResponsesByQuestion(survey._id , question._id, question.optionC).subscribe((r)=>{
              question['responseC'] = Math.round((r/survey.totalResponses)*100);
            });
            this.crudHttpService.listResponsesByQuestion(survey._id , question._id, question.optionD).subscribe((r)=>{
              question['responseD'] = Math.round((r/survey.totalResponses)*100);
            });
          }
          else{
            this.crudHttpService.listResponsesByQuestion(survey._id , question._id, "true").subscribe((r)=>{
              question['responseTrue'] = Math.round((r/survey.totalResponses)*100);
            });
            this.crudHttpService.listResponsesByQuestion(survey._id , question._id, "false").subscribe((r)=>{
              question['responseFalse'] = Math.round((r/survey.totalResponses)*100);
            });
          }
        }
      }

    },(error=>{

    }));
  }

}
