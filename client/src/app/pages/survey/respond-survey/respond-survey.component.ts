import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudHttpService } from '../crud/crud-http.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-respond-survey',
  templateUrl: './respond-survey.component.html',
  styleUrls: ['./respond-survey.component.css']
})
export class RespondSurveyComponent{
  public mySurvey: any;
  public i: number = 0;

  surveyResponse = this.fb.group({
    surveyId: [this.route.snapshot.paramMap.get('id'), [Validators.required]],
    questions: this.fb.array([])
  });

  constructor(private route: ActivatedRoute, private crudHttpService: CrudHttpService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.crudHttpService.listSurveyById(this.route.snapshot.paramMap.get('id')).subscribe((response)=>{
      this.mySurvey = response;
      for(let question of this.mySurvey.questions){
        const newQuestion = this.fb.group({
          questionId: [question._id, Validators.required],
          response: ['', Validators.required]
        })
        this.questions.push(newQuestion);
      }
      },(error=>{
        
      }));
  }

  get questions() {
    return this.surveyResponse.get('questions') as FormArray;
  }

  respondSurvey(data: any){
    let errorMessage = "";
    let errorCount = 0;

    for(let i = 0; i < data.questions.length; i++){
      if(data.questions[i].response === ""){
        errorMessage += "You should respond question "+(i+1)+"!\n";
        errorCount++;
      }
    }

    if(errorCount > 0){
      window.alert(errorMessage);
    }
    else{
      this.crudHttpService.createResponse(data).subscribe();
      this.router.navigate(['/home']);
    }
  }
}
