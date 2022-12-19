import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudHttpService {
  apiUrlGetSurveys: string = environment.backend + '/api/get/surveys';
  apiUrlGetAvailableSurveys: string = environment.backend + '/api/get/available-surveys';
  apiUrlGetSurveyById: string = environment.backend + '/api/get/survey';
  apiUrlGetResponse: string = environment.backend + '/api/get/responses';
  apiUrlPostSurvey: string = environment.backend + '/api/post/surveys';
  apiUrlPostResponses: string = environment.backend + '/api/post/responses';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private router: Router) { }

  createSurvey(survey: any): Observable<any> {
    let API_URL = `${this.apiUrlPostSurvey}`;
    
    this.router.navigate(['/home']);
    return this.http.post(API_URL, survey);
  }

  createResponse(response: any): Observable<any>{
    let API_URL = `${this.apiUrlPostResponses}`;
    return this.http.post(API_URL, response);
  }

  listResponsesByQuestion(surveyId: any , questionId: any, response: any) : Observable<any>{
    let API_URL = `${this.apiUrlGetResponse}/${surveyId}/${questionId}/${response}`;
    return this.http.get<JSON>(API_URL);
  }

  listResponsesBySurvey(surveyId: any) : Observable<any>{
    let API_URL = `${this.apiUrlGetResponse}/${surveyId}`;
    return this.http.get<JSON>(API_URL);
  }

  listSurveys(owner: String) {    
    return this.http.get(`${this.apiUrlGetSurveys}/${owner}`);
  }

  listAvailableSurveys() {    
    return this.http.get(`${this.apiUrlGetAvailableSurveys}`);
  }
  
  listSurveyById(id: any): Observable<JSON> {
    let API_URL = `${this.apiUrlGetSurveyById}/${id}`;
    return this.http.get<JSON>(API_URL);
  }

  updateSurvey(id: any, updatedSurvey: any) {
    let API_URL = `${this.apiUrlPostSurvey}/${id}`;
    return this.http.post(API_URL, updatedSurvey).subscribe();
  }

  deleteSurvey(id: any){
    let API_URL = `${this.apiUrlGetSurveys}/${id}`;

    return this.http.delete(API_URL);
  }
}
