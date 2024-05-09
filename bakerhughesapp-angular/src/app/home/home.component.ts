import { SurveyService } from './../services/survey.service';
import { SurveyDTO } from './../dtos/survey.dto';
import { Component, OnInit } from '@angular/core';
import { ToolService } from '../services/tool.service';
import { ToolDTO } from '../dtos/tool.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  surveys: SurveyDTO[] = [];
  tool: ToolDTO = new ToolDTO(0); // Initialize tool object as null

  constructor(
    private surveyService: SurveyService,
    private toolService: ToolService
  ) {}

  // Load component xong thuc hien getAll() ngay
  ngOnInit(): void {
    this.getToolInformation();
    this.getAllSurveys();
  }

  // Update calculated survey
  updateAllSurveys() {
    this.surveyService.updateAllSurveys().subscribe({
      next: (response: any) => {
        // Update existing surveys 
        this.surveys = response.data.map((survey: any) => {
          return {
            id: survey.id,
            dp_length: survey.dpLength,
            bit_depth: survey.bitDepth,
            survey_depth: survey.surveyDepth,
            inc: survey.inc,
            azi: survey.azi,
            totalseen: survey.totalSeen,
            dlsWa: survey.dlsWa,
            dls30m: survey.dls30m,
            motorYield: survey.motorYield,
            toolface: survey.toolFace,
            st: survey.st,
            ed: survey.ed,
            totalslid: survey.totalSlid,
            slidseen: survey.slidSeen,
            slidunseen: survey.slidUnseen,
          };
        });
      },
      complete: () => {},
      error: (error: any) => {
        alert(`Cannot calculated surveys, error: ${error.error});
        }`);
      },
    });
  }

  // get all survey 
  getAllSurveys() {
    this.surveyService.getAllSurveys().subscribe({
      next: (response: any) => {
        // Xu ly ket qua khi insert thanh cong
        this.surveys = response.data.map((survey: any) => {
          return {
            id: survey.id,
            dp_length: survey.dpLength,
            bit_depth: survey.bitDepth,
            survey_depth: survey.surveyDepth,
            inc: survey.inc,
            azi: survey.azi,
            totalseen: survey.totalSeen,
            dlsWa: survey.dlsWa,
            dls30m: survey.dls30m,
            motorYield: survey.motorYield,
            toolface: survey.toolFace,
            st: survey.st,
            ed: survey.ed,
            totalslid: survey.totalSlid,
            slidseen: survey.slidSeen,
            slidunseen: survey.slidUnseen,
          };
        });
      },
      complete: () => {},
      error: (error: any) => {
        alert(`Cannot insert survey, error: ${error.error});
        }`);
      },
    })
  }
  // delete survey by ID
  deleteSurvey(id: number) {
    this.surveyService.deleteSurveyByID(id).subscribe({
      next: (response: any) => {
        console.log('Survey deleted successfully:', response);
        this.surveyService.getAllSurveys;
      },
      complete: () => {
        this.surveyService.getAllSurveys;
      },
      error: (error: any) => {
        alert(`Cannot delete survey, error: ${error.error});
        }`);
      },
    });
  }

  // get Tool information
  getToolInformation() {
    this.toolService.getToolById(1).subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.tool = new ToolDTO(response.data); // Update tool object with response data
        } else {
          this.tool = new ToolDTO(0); // If response is null or data is missing, reset tool to default values
        }
      },
      complete: () => {},
      error: (error: any) => {
        alert(`Querry tool information unsuccessful, error: ${error.error}`);
      },
    });
  }
}
