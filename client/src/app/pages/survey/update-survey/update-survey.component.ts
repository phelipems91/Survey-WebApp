import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudHttpService } from '../crud/crud-http.service';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-update-survey',
  templateUrl: './update-survey.component.html',
  styleUrls: ['./update-survey.component.css']
})

export class UpdateSurveyComponent{
  public mySurvey: any;
  public id: any;
  survey = this.fb.group({
    surveyName: '',
    lastModification: '',
    startDate: '',
    endDate: '',
    owner: '',
    questions: this.fb.array([])
  });

  constructor(private route: ActivatedRoute, private crudHttpService: CrudHttpService, private router: Router, private fb: FormBuilder) { 
    this.id = route.snapshot.paramMap.get('id');
    this.crudHttpService.listSurveyById(this.id).subscribe((response)=>{
      this.mySurvey = response;
      this.survey = this.fb.group({
        surveyName: [this.mySurvey.surveyName],
        lastModification: [this.mySurvey.lastModification],
        startDate: [this.mySurvey.startDate],
        endDate: [this.mySurvey.endDate],
        owner: [this.mySurvey.owner],
        questions: this.fb.array(this.mySurvey.questions.map((r: any) => this.fb.group(r)))
      });
    },(error=>{

    }));
  }

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

  updateSurvey(data: any){
    let errorMessage = "";
    let errorCount = 0;

    if(data.surveyName === ""){
      errorMessage += "Survey Name is blank!\n";
      errorCount++;
    }
    if(data.startDate === ""){
      errorMessage += "Start Date is blank!\n";
      errorCount++;
    }
    if(data.endDate === ""){
      errorMessage += "End Date is blank!\n";
      errorCount++;
    }
    if(data.questions.length === 0){
      errorMessage += "You should insert at least a question!\n";
      errorCount++;
    }
    for(let i = 0; i < data.questions.length; i++){
      if(data.questions[i].description === ""){
        errorMessage += "You should insert a description for question "+(i+1)+"!\n";
        errorCount++;
      }
      if(data.questions[i].questionType === ""){
        errorMessage += "You should insert a type for question "+(i+1)+"!\n";
        errorCount++;
      }
      if(data.questions[i].questionType === "multipleChoice"
         && (data.questions[i].optionA === ""
             || data.questions[i].optionB === ""
             || data.questions[i].optionC === ""
             || data.questions[i].optionD === ""
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
      this.crudHttpService.updateSurvey(this.id,data);
      this.router.navigate(['/home']);
    }
    
  }

  removeQuestion(questionIndex: number){
    this.questions.removeAt(questionIndex);
  }


}





