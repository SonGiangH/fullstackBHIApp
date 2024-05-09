import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { NgModule } from '@angular/core';
import { SurveyformComponent } from '../surveyform/surveyform.component';
import { EditSurveyComponentComponent } from '../edit-survey-component/edit-survey-component.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { SteermodeComponent } from '../steermode/steermode.component';
import { HoldmodeComponent } from '../holdmode/holdmode.component';

// config routes
const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'sliding-sheet', component: HomeComponent },
  { path: 'survey', component: SurveyformComponent },
  { path: 'edit/:id', component: EditSurveyComponentComponent },
  { path: 'steer', component: SteermodeComponent },
  { path: 'hold', component: HoldmodeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
