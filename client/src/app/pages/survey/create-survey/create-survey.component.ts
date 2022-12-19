import { Component, OnInit } from '@angular/core';
import { CrudHttpService } from '../crud/crud-http.service';
import {FormArray, FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/admin/auth/auth.service';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent{
  public currentDate = new Date().toISOString().split('T')[0];

  survey = this.fb.group({
    surveyName: '',
    lastModification: this.currentDate,
    startDate: '',
    endDate: '',
    owner: this.authService.authenticatedUser(),
    questions: this.fb.array([])
  });

  constructor(private fb: FormBuilder, private crudHttpService: CrudHttpService, private router: Router, private authService: AuthService) { }

  get questions(){
    return this.survey.controls["questions"] as FormArray;
  }

  addQuestion(){
    const questionForm = this.fb.group({
      description: ['', Validators.required],
      questionType: ['',Validators.required],
      optionA: ['',Validators.required],
      optionB: ['',Validators.required],
      optionC: ['',Validators.required],
      optionD: ['',Validators.required]
    });

    this.questions.push(questionForm);
  }

  removeQuestion(questionIndex: number){
    this.questions.removeAt(questionIndex);
  }

  createSurvey(survey: any){
    let errorMessage = "";
    let errorCount = 0;

    if(survey.surveyName === ""){
      errorMessage += "Survey Name is blank!\n";
      errorCount++;
    }
    if(survey.startDate === ""){
      errorMessage += "Start Date is blank!\n";
      errorCount++;
    }
    if(survey.endDate === ""){
      errorMessage += "End Date is blank!\n";
      errorCount++;
    }
    if(survey.questions.length === 0){
      errorMessage += "You should insert at least a question!\n";
      errorCount++;
    }
    for(let i = 0; i < survey.questions.length; i++){
      if(survey.questions[i].description === ""){
        errorMessage += "You should insert a description for question "+(i+1)+"!\n";
        errorCount++;
      }
      if(survey.questions[i].questionType === ""){
        errorMessage += "You should insert a type for question "+(i+1)+"!\n";
        errorCount++;
      }
      if(survey.questions[i].questionType === "multipleChoice"
         && (survey.questions[i].optionA === ""
             || survey.questions[i].optionB === ""
             || survey.questions[i].optionC === ""
             || survey.questions[i].optionD === ""
            )
      ){
        errorMessage += "You should insert a description for all options of question "+(i+1)+"!\n";
        errorCount++;
      }
    }

    if(errorCount > 0){
      window.alert(errorMessage);
    }
    else{
      this.crudHttpService.createSurvey(survey).subscribe();
      window.alert("Survey Created!");
      this.router.navigate(['/home']);
    }
  }
}
