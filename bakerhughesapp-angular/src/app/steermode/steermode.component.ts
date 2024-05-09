import { Component } from '@angular/core';
import { Direction } from '../models/direction.model';

@Component({
  selector: 'app-steermode',
  templateUrl: './steermode.component.html',
  styleUrls: ['./steermode.component.scss'],
})
export class SteermodeComponent {
  degreeToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  direction: Direction = {
    dlgBase: 65,
    sfBase: 10000.0,
    sdBase: 3450.0,
    actIncBase: 900.0,
    bfBase: 10000.0,
    wfBase: 20000.0,
    tiBase: 1280.0,

    degreeToRadians(degrees: number): number {
      return (degrees * Math.PI) / 180;
    },

    // showing DLG adjust
    get doglegGradient(): number {
      return this.dlgBase / 1000;
    },

    // STEER FORCE section
    // showing Steer Force adjust
    get steerForce(): number {
      return this.sfBase / 100;
    },

    // showing Steer Direction adjust
    get steerDirection(): number {
      return this.sdBase / 10;
    },

    // showing Actual Inclination adjust
    get actualHoleInc(): number {
      return this.actIncBase / 10;
    },

    // Expected Steer DLS
    get steerDLS(): number {
      return this.doglegGradient * this.steerForce;
    },

    // Expected BUR
    get buildRate(): number {
      return (
        this.doglegGradient *
        Math.cos(this.degreeToRadians(this.steerDirection)) *
        this.steerForce
      );
    },

    // Expected WR
    get walkRate(): number {
      return (
        (this.steerForce *
          Math.sin(this.degreeToRadians(this.steerDirection)) *
          this.doglegGradient) /
        Math.sin(this.degreeToRadians(this.actualHoleInc))
      );
    },

    // HOLD MODE Section
    // Showing Target Inc section
    get targetInclination(): number {
      return this.tiBase / 10;
    },

    // Showing Build Force
    get buildForce(): number {
      return this.bfBase / 100;
    },

    // Showing Walk Force
    get walkForce(): number {
      return this.wfBase / 100.0 - 100.0;
    },

    get holdModeDLS(): number {
      return this.doglegGradient * this.resultantSteerForce;
    },

    get resultantSteerForce(): number {
      let sqrtValue = Math.sqrt(
        Math.pow(this.walkForce, 2) + Math.pow(this.buildForce, 2)
      );
      return sqrtValue > 100 ? 100 : sqrtValue;
    },

    // Showing Hold Mode BUR / WR
    formatDecimal(number: number): number {
      return Math.round(number * 10) / 10;
    },

    convertToDegrees(radians: number): number {
      return (radians * 180) / Math.PI;
    },

    get resultantDirection(): number {
      if (this.actualHoleInc <= this.targetInclination) {
        if (this.walkForce > 0) {
          return this.formatDecimal(
            this.convertToDegrees(Math.atan2(this.walkForce, this.buildForce))
          );
        } else {
          return this.formatDecimal(
            this.convertToDegrees(Math.atan2(this.walkForce, this.buildForce)) +
              360.0
          );
        }
      } else {
        return this.formatDecimal(
          this.convertToDegrees(Math.atan2(this.buildForce, this.walkForce)) +
            90.0
        );
      }
    },

    get holdModeBuildRate(): number {
      return (
        this.resultantSteerForce *
        Math.cos(this.degreeToRadians(Math.abs(this.resultantDirection))) *
        this.doglegGradient
      );
    },

    get holdModeWalkRate(): number {
      return (
        (this.resultantSteerForce *
          Math.sin(this.degreeToRadians(this.resultantDirection)) *
          this.doglegGradient) /
        Math.sin(this.degreeToRadians(this.actualHoleInc))
      );
    },
  };

  constructor() {}

  // step
  step(): number {
    return 10000.0 / 31.0;
  }

  // decrease DLG button
  decreaseDlBase(): void {
    this.direction.dlgBase =
      this.direction.dlgBase - 1 <= 0 ? 0 : this.direction.dlgBase - 1;
    console.log(this.direction.dlgBase);
  }

  // Increase DLG button
  increaseDlBase(): void {
    this.direction.dlgBase += 1;
  }

  // Increase / Decrease Steer Force
  increaseSteerForce(): void {
    this.direction.sfBase =
      this.direction.sfBase < 10000.0
        ? this.direction.sfBase + this.step()
        : this.direction.sfBase;
  }

  decreaseSteerForce(): void {
    this.direction.sfBase =
      this.direction.sfBase > 0.0
        ? this.direction.sfBase - this.step()
        : this.direction.sfBase;
  }

  // Increase-Decrease Steer Direction
  // Steer Direction Big
  increaseSDBig() {
    this.direction.sdBase =
      this.direction.sdBase + 150.0 > 3600.0
        ? Math.abs(this.direction.sdBase - 3450.0)
        : this.direction.sdBase + 150.0;
  }

  decreaseSDBig() {
    this.direction.sdBase =
      this.direction.sdBase - 150.0 < 0.0
        ? this.direction.sdBase + 3450.0
        : this.direction.sdBase - 150.0;
  }

  // Steer Direction Small
  increaseSDSmall() {
    this.direction.sdBase =
      this.direction.sdBase + 15.0 > 3600.0
        ? Math.abs(this.direction.sdBase - 3585.0)
        : this.direction.sdBase + 15.0;
  }

  decreaseSDSmall() {
    this.direction.sdBase =
      this.direction.sdBase - 15.0 < 0.0
        ? this.direction.sdBase + 3585.0
        : this.direction.sdBase - 15.0;
  }

  // Actual Inclination Small
  increaseIncSmall(): void {
    this.direction.actIncBase =
      this.direction.actIncBase + 1.0 >= 1400.0
        ? 1400.0
        : this.direction.actIncBase + 1.0;
  }

  decreaseIncSmall(): void {
    this.direction.actIncBase =
      this.direction.actIncBase - 1.0 <= 0.0
        ? 0.0
        : this.direction.actIncBase - 1.0;
  }

  // Actual Inclination Big
  increaseIncBig(): void {
    this.direction.actIncBase =
      this.direction.actIncBase + 10.0 >= 1400.0
        ? 1400.0
        : this.direction.actIncBase + 10.0;
  }

  decreaseIncBig(): void {
    this.direction.actIncBase =
      this.direction.actIncBase - 10.0 <= 0.0
        ? 0.0
        : this.direction.actIncBase - 10.0;
  }

  // Build Force controller
  increaseBuildForce(): void {
    this.direction.bfBase =
      this.direction.bfBase + 10000.0 / 31.0 > 10000.0
        ? 10000.0
        : this.direction.bfBase + 10000.0 / 31.0;
  }

  decreaseBuildForce(): void {
    this.direction.bfBase =
      this.direction.bfBase - 10000.0 / 31.0 < 0.0
        ? 0.0
        : this.direction.bfBase - 10000.0 / 31.0;
  }
}
