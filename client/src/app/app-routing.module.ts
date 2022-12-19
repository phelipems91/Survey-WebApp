import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { AboutComponent } from "./pages/about/about.component";
import { CreateSurveyComponent } from "./pages/survey/create-survey/create-survey.component";
import { ListSurveyComponent } from "./pages/survey/list-survey/list-survey.component";
import { UpdateSurveyComponent } from './pages/survey/update-survey/update-survey.component';
import { RespondSurveyComponent } from './pages/survey/respond-survey/respond-survey.component';
import { SurveyResultsComponent } from './pages/survey/survey-results/survey-results.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuardService as AuthGuard } from './admin/auth/auth-guard.service';
import { RegisterComponent } from "./admin/register/register.component";
import { AvailableSurveysComponent } from './pages/survey/available-surveys/available-surveys.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: 'about', component: AboutComponent, data: {title: 'About'}},
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {path: 'register', component: RegisterComponent, data: {title: 'Register'}},
  {path: '', redirectTo: 'home', pathMatch: "full"},
  {path: 'create-survey', component: CreateSurveyComponent, canActivate: [AuthGuard], data: {title: 'Create Surveys'}},
  {path: 'survey-list', component: ListSurveyComponent, data: {title: 'Surveys'}},
  {path: 'update-survey/:id', component: UpdateSurveyComponent, canActivate: [AuthGuard], data: {title: 'Surveys'}},
  {path: 'respond-survey/:id', component: RespondSurveyComponent, data: {title: 'Respond Survey'}},
  {path: 'survey-results', component: SurveyResultsComponent, canActivate: [AuthGuard], data: {title: 'Survey Results'} },
  {path: 'available-surveys', component: AvailableSurveysComponent, data: {title: 'Available Surveys'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
