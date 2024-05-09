import { SurveyDTO } from './../dtos/survey.dto';
import { SurveyService } from './../services/survey.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-surveyform',
  templateUrl: './surveyform.component.html',
  styleUrls: ['./surveyform.component.scss'],
})
export class SurveyformComponent {
  survey_depth: number;
  inc: number;
  azi: number;
  dlsWa:number;

  // dependencies injection (inject HttpClient, Router)
  constructor(private surveyService: SurveyService) {
    this.survey_depth = 0; // initialize value = gia tri ban dau
    this.inc = 0;
    this.azi = 0;
    this.dlsWa =0;
  }

  // submit button
  submitSurvey() {
    const surveyDTO: SurveyDTO = {
      id: 0,
      dp_length: 0,
      bit_depth: this.survey_depth,
      survey_depth: this.survey_depth,
      inc: this.inc,
      azi: this.azi,
      totalseen: 0,
      dlsWa: this.dlsWa,
      dls30m: 0,
      motorYield: 0,
      toolface: '',
      st: 0,
      ed: 0,
      totalslid: 0,
      slidseen: 0,
      slidunseen: 0,
    };

    // create new survey
    this.surveyService.insertSurvey(surveyDTO).subscribe({
      next: () => {
        // call to calculated survey api
        this.surveyService.getAllSurveys();
        // reload khi create thanh cong
        window.location.reload();
      },
      complete: () => {
        this.surveyService.getAllSurveys();
        window.location.reload();
      },
      error: (error: any) => {
        alert(`Cannot insert survey, error: ${error.error}`);
      },
    });
  }

  // Clear all survey
  clearAllData() {
    this.surveyService.clearData().subscribe({
      next: () => {
        // update calculated surveys
        this.surveyService.getAllSurveys();
        window.location.reload();
      },
      complete: () => {},
      error: (error: any) => {
        alert(`Cannot insert survey, error: ${error.error});
        }`);
      },
    });
  }
}
