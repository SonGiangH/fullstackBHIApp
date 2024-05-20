import { Component } from '@angular/core';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss']
})
export class TableCellComponent {
  survey1: {depth: number,inclination: number,azimuth: number}
  survey2: {depth: number,inclination: number,azimuth: number}
  result: {toolFace: number, DLS: number}

  constructor() {
    this.survey1 = {
      depth: 0,
      inclination: 0,
      azimuth: 0
    }
    this.survey2 = {
      depth: 0,
      inclination: 0,
      azimuth: 0
    }
    this.result = {
      toolFace: 0,
      DLS: 0
    }
  }  

  // To radiant
  toRadians (angle: number) {
    return angle * (Math.PI / 180);
  }

  toDegrees (angle: number) {
    return angle * (180 / Math.PI);
  }

  // calculate DLS between 2 surveys
  calculateDLS() {
    const a = Math.sin(this.toRadians(Math.abs(this.survey2.azimuth-this.survey1.azimuth))) * this.survey2.inclination;
    const b = Math.sqrt(Math.pow(this.survey2.inclination,2) - Math.pow(a,2));
    const c = b - this.survey1.inclination;

    // dls
    const dlsPerLength = Math.sqrt(Math.pow(a,2) + Math.pow(c,2));
    const dls = (dlsPerLength / Math.abs(this.survey2.depth - this.survey1.depth)) * 30;

    // Toolface
    const raw =this.toDegrees(Math.asin(a/dlsPerLength));

    // Build
    if (this.survey1.inclination < this.survey2.inclination) {
      // Turn left 
      if (this.survey1.azimuth > this.survey2.azimuth) {
        this.result.toolFace = 360 - raw;
      } else {
        this.result.toolFace = raw;
      }
    } else {// Drop
      // Turn left
      if (this.survey1.azimuth > this.survey2.azimuth) {
        this.result.toolFace = 180 + raw;
      } else {
        // Turn right
        this.result.toolFace = 180 - raw;
      }
    }

    console.log(`a=${a}; b = ${b}; c= ${c}; raw= ${raw}`)
    this.result.DLS = dls;    
  }
}
