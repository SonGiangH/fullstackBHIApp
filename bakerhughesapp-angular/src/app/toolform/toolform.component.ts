import { Component } from '@angular/core';
import { ToolService } from '../services/tool.service';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-toolform',
  templateUrl: './toolform.component.html',
  styleUrls: ['./toolform.component.scss'],
})
export class ToolformComponent {
  sensorOffset: number;
  defaultBur: number;

  // constructor
  constructor(
    private toolService: ToolService,
    private surveyService: SurveyService
  ) {
    (this.sensorOffset = 0), (this.defaultBur = 0);
  }

  // Update Tool Information
  updateToolInformation() {
    const toolDTO = {
      sensor_offset: this.sensorOffset,
      default_bur: this.defaultBur,
    };

    // get Tool by ID = 1, phan tu duy nhat trong database
    this.toolService.getToolById(1).subscribe((existingTool) => {
      if (existingTool) {
        // neu ton tai roi thi chi update
        this.toolService.updateToolById(toolDTO, 1).subscribe({
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
            alert(`Cannot create tool, error: ${error.error}`);
          },
        });
      } else {
        // neu khong ton tai tool trong database, thi submit button to create new tool
        this.toolService.createTool(toolDTO).subscribe({
          next: () => {
            // call to calculated survey api
            this.toolService.getToolById(1);
            this.surveyService.getAllSurveys();
            // reload khi create thanh cong
            window.location.reload();
          },
          complete: () => {
            this.toolService.getToolById(1);
            this.surveyService.getAllSurveys();
            window.location.reload();
          },
          error: (error: any) => {
            alert(`Cannot create tool, error: ${error.error}`);
          },
        });
      }
    });
  }
}
