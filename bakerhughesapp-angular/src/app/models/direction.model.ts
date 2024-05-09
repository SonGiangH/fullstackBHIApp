export class Direction {
  dlgBase: number = 65; // initial value of E4
  sfBase: number = 10000.0; // initial value of E6
  sdBase: number = 3450.0; // initial value of E7
  actIncBase: number = 900.0; // initial value of J4
  bfBase: number = 10000.0; // initial value of E10
  wfBase: number = 20000.0; // initial value of E11
  tiBase: number = 1280.0; // initial value of E12

  get doglegGradient(): number {
    return this.dlgBase / 1000;
  }

  get steerForce(): number {
    return this.sfBase / 100;
  }

  get steerDirection(): number {
    return this.sdBase / 10;
  }

  get actualHoleInc(): number {
    return this.actIncBase / 10;
  }

  get steerDLS(): number {
    return this.doglegGradient * this.steerForce;
  }

  get buildRate(): number {
    return (
      this.doglegGradient *
      Math.cos(this.degreeToRadians(this.steerDirection)) *
      this.steerForce
    );
  }

  degreeToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  get walkRate(): number {
    return (
      (this.steerForce *
        Math.sin(this.degreeToRadians(this.steerDirection)) *
        this.doglegGradient) /
      Math.sin(this.degreeToRadians(this.actualHoleInc))
    );
  }

  get targetInclination(): number {
    return this.tiBase / 10;
  }

  get buildForce(): number {
    return this.bfBase / 100;
  }

  get walkForce(): number {
    return this.wfBase / 100.0 - 100.0;
  }

  get holdModeDLS(): number {
    return this.doglegGradient * this.resultantSteerForce;
  }

  get resultantSteerForce(): number {
    let sqrtValue = Math.sqrt(
      Math.pow(this.walkForce, 2) + Math.pow(this.buildForce, 2)
    );
    return sqrtValue > 100 ? 100 : sqrtValue;
  }

  formatDecimal(number: number): number {
    return Math.round(number * 10) / 10;
  }

  convertToDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
  }

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
  }

  get holdModeBuildRate(): number {
    return (
      this.resultantSteerForce *
      Math.cos(this.degreeToRadians(Math.abs(this.resultantDirection))) *
      this.doglegGradient
    );
  }

  get holdModeWalkRate(): number {
    return (
      (this.resultantSteerForce *
        Math.sin(this.degreeToRadians(this.resultantDirection)) *
        this.doglegGradient) /
      Math.sin(this.degreeToRadians(this.actualHoleInc))
    );
  }
}
