import { SurveyService } from './../services/survey.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyDTO } from '../dtos/survey.dto';

@Component({
  selector: 'app-edit-survey-component',
  templateUrl: './edit-survey-component.component.html',
  styleUrls: ['./edit-survey-component.component.scss'],
})
export class EditSurveyComponentComponent implements OnInit {
  survey: SurveyDTO;
  survey_depth: number;
  inc: number;
  azi: number;
  dlsWa: number;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private router: Router
  ) {
    this.survey_depth = 0; // initialize value = gia tri ban dau
    this.inc = 0;
    this.azi = 0;
    this.dlsWa = 0;

    this.survey = {
      id: 0,
      dp_length: 0,
      bit_depth: 0,
      survey_depth: 0,
      inc: 0,
      azi: 0,
      totalseen: 0,
      dlsWa: 0,
      dls30m: 0,
      motorYield: 0,
      toolface: '',
      st: 0,
      ed: 0,
      totalslid: 0,
      slidseen: 0,
      slidunseen: 0,
    };
  }

  ngOnInit(): void {
    // Get survey ID from route parameter
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.survey.id = +idParam;

      // Fetch survey data using this ID
      this.surveyService.getSurveyById(this.survey.id).subscribe({
        next: (response: any) => {
          // xu ly ket qua khi get data thanh cong
          const existingSurvey = response.data;

          this.survey = {
            id: existingSurvey.id,
            dp_length: existingSurvey.dpLength,
            bit_depth: existingSurvey.bitDepth,
            survey_depth: existingSurvey.surveyDepth,
            inc: existingSurvey.inc,
            azi: existingSurvey.azi,
            totalseen: existingSurvey.totalSeen,
            dlsWa: existingSurvey.dlsWa,
            dls30m: existingSurvey.dls30m,
            motorYield: existingSurvey.motorYield,
            toolface: existingSurvey.toolFace,
            st: existingSurvey.st,
            ed: existingSurvey.ed,
            totalslid: existingSurvey.totalSlid,
            slidseen: existingSurvey.slidSeen,
            slidunseen: existingSurvey.slidUnseen,
          };
        },
        complete: () => {},
        error: (error: any) => {
          alert(`Cannot get survey by id: ${idParam}`);
        },
      });
    } else {
      // Handle the case where the id parameter is null
      console.error(`Survey ${idParam} is null`);
    }
  }

  // Save changes button
  editSurveyById() {
    
    const surveyDTO: SurveyDTO = {
      id: this.survey.id,
      dp_length: 0,
      bit_depth: this.survey_depth,
      survey_depth: this.survey.survey_depth,
      inc: this.survey.inc,
      azi: this.survey.azi,
      totalseen: 0,
      dlsWa: 0,
      dls30m: 0,
      motorYield: 0,
      toolface: '',
      st: 0,
      ed: 0,
      totalslid: 0,
      slidseen: 0,
      slidunseen: 0,
    };

    // update survey
    this.surveyService.updateSurveyById(surveyDTO, this.survey.id).subscribe({
      next: () => {
        // redirect to home component
        this.router.navigate(['']);
      },
      complete: () => {
        // redirect to home component
        this.router.navigate(['']);
      },
      error: (error: any) => {
        alert(`Cannot update survey, error: ${error.error});
        }`);
      },
    });
  }
}
