import { SurveyService } from './../services/survey.service';
import { SurveyDTO } from './../dtos/survey.dto';
import { Component, OnInit } from '@angular/core';
import { ToolService } from '../services/tool.service';
import { ToolDTO } from '../dtos/tool.dto';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';   // reactive Form


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  surveys: SurveyDTO[] = [];
  tool: ToolDTO = new ToolDTO(0); // Initialize tool object as null
  form: FormGroup;
  formBUR: FormGroup;
  formSlide: FormGroup;

  // boolean toggle button
  isFormsDivVisible = false;
  isDLSVisible = false;

  constructor(
    private surveyService: SurveyService,
    private toolService: ToolService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      motorYield: [''],
      dlsRequired: [''],
      length:[''],
      singleLengthForDLS: [''],
      slideLength:[''],
      motorYieldForProjection:[''],
      slideDist: [{ value: '', disabled: true }],
      slidePercent: [{ value: '', disabled: true }],
      expectDLS: [{ value: '', disabled: true }],
    });
    this.formBUR = this.fb.group({
      dlg:[''],
      incStart:[''],
      incEnd:[''],
      singleLength:[''],
      expectBUR: [{value:'', disabled: true}]
    });
    this.formSlide = this.fb.group({
      motorYield: [''],
      dlsRequired: [''],
      singleLength:[''],
      slideLength:[''],
      rotDls:[''],
      slideDist: [{ value: '', disabled: true }],
      slidePercent: [{ value: '', disabled: true }],
    })
  }

  // Load component xong thuc hien getAll() ngay
  ngOnInit(): void {
    this.getToolInformation();
    this.getAllSurveys();
  }

  // Process survey
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
            meterAhead: survey.meterAhead,
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
            meterAhead: survey.meterAhead
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
      next: () => {
        this.surveyService.getAllSurveys;
        this.router.navigate(['sliding-sheet'])
      },
      complete: () => {
        this.surveyService.getAllSurveys;
        this.router.navigate(['sliding-sheet'])        
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

  // condition to display arrow up and down for toolface
  isToolfaceInRange(toolface: string): 'up' | 'down' | '' {
    if (toolface.trim() === '') {
      return ''; // Return empty string if toolface is empty
    }
    
    const value = parseFloat(toolface);
    
    if (!isNaN(value)) {
      if (value > 90 && value < 270) {
        return 'down';
      } else if ((value < 90 && value > 0) || (value > 270 && value < 360)) {
        return 'up';
      }
    }
    
    return '';
  }  

  // calculate Slide distance
  calculateValues() {
    const motorYield = parseFloat(this.form.value.motorYield);
    const dlsRequired = parseFloat(this.form.value.dlsRequired);
    const singleLength = parseFloat(this.form.value.length);

    if (!isNaN(motorYield) && !isNaN(dlsRequired)) {
      // Calculation logic
      const slidePercent =  dlsRequired / motorYield;  // slide percent 
      const slideDist = singleLength * slidePercent;   // slide distance  

      this.form.patchValue({
        slideDist: slideDist.toFixed(2),
        slidePercent: (slidePercent * 100).toFixed(0)
      });
    }
  }

  // calculate slide distance with Rotary Effect
  calculateSlideWithRotaryEffect() {
    const motorYield = parseFloat(this.formSlide.value.motorYield);
    const dlsRequired = parseFloat(this.formSlide.value.dlsRequired);
    const rotDls = parseFloat(this.formSlide.value.rotDls);
    const singleLength = parseFloat(this.formSlide.value.singleLength);

    if (!isNaN(motorYield) && !isNaN(dlsRequired) && !isNaN(rotDls)) {
      // Calculation logic
      const slidePercent = (dlsRequired - rotDls) / (motorYield - rotDls);
      const slideDist = singleLength * slidePercent;
    
      this.formSlide.patchValue({
        slidePercent: (slidePercent* 100).toFixed(0),
        slideDist: slideDist.toFixed(2)
      })
    }    
  }

  // calculate BUR
  calculateBUR() {
    const dlg = parseFloat(this.formBUR.value.dlg);
    const incStart = parseFloat(this.formBUR.value.incStart);
    const incEnd = parseFloat(this.formBUR.value.incEnd);
    const singleLength = parseFloat(this.formBUR.value.singleLength);

    if (!isNaN(dlg) && !isNaN(incStart) && !isNaN(incEnd) && !isNaN(singleLength)) {
      // calculation logic
      const expectBur = Math.abs(incEnd-incStart) * 30 / singleLength;

      this.formBUR.patchValue({
        expectBUR: expectBur.toFixed(2)
      })
    }
  }

  // calculate DLS for Projection
  calculateDLSForPrj() {
    const motorYieldForProjection = parseFloat(this.form.value.motorYieldForProjection);
    const slideLength = parseFloat(this.form.value.slideLength);
    const singleLengthForDLS = parseFloat(this.form.value.singleLengthForDLS);

    if (!isNaN(motorYieldForProjection) && !isNaN(slideLength) && !isNaN(singleLengthForDLS)) {
      // calculation logic
      const expectDLS = (slideLength / singleLengthForDLS) * motorYieldForProjection;

      this.form.patchValue({
        expectDLS: expectDLS.toFixed(2)
      })
    }
  }

  // Method to toggle the visibility of the div
  toggleFormsDivVisibility() {
    this.isFormsDivVisible = !this.isFormsDivVisible;
  }

  // Method to toggle the visibility of the div
  toggleDLSDivVisibility() {
    this.isDLSVisible = !this.isDLSVisible;
  }
}

