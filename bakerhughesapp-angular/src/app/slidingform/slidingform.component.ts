import { SlidingDTO } from './../dtos/sliding.dto';
import { SurveyService } from './../services/survey.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-slidingform',
  templateUrl: './slidingform.component.html',
  styleUrls: ['./slidingform.component.scss'],
})
export class SlidingformComponent {
  surveyID: number;
  toolFace: string;
  st: number;
  ed: number;

  // constructor with dependencies injection
  constructor(private surveyService: SurveyService) {
    this.surveyID = 0;
    this.toolFace = '';
    this.st = 0;
    this.ed = 0;
  }

  //

  updateSurveyWithSlidingData() {
    console.log(`${this.surveyID}+${this.toolFace} + ${this.st} + ${this.ed} `);

    const slidingDTO: SlidingDTO = {
      surveyID: this.surveyID,
      toolFace: this.toolFace,
      st: this.st,
      ed: this.ed,
    };
    // update sliding data
    this.surveyService.updateSliding(slidingDTO).subscribe({
      next: () => {
        // update calculated surveys
        this.surveyService.getAllSurveys();
        // reload khi create thanh cong
        window.location.reload();
      },
      complete: () => {
        // update calculated surveys
        this.surveyService.getAllSurveys();
        // reload khi create thanh cong
        window.location.reload();
      },
      error: (error: any) => {
        alert(`Cannot insert sliding, error: ${error.error});
        }`);
      },
    });
  }
}
