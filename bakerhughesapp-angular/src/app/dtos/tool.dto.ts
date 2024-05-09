export class ToolDTO {
  sensor_offset: number = 0;
  default_bur: number = 0;

  constructor(data: any) {
    this.sensor_offset = data.sensorOffset !== null ? data.sensorOffset : 0;
    this.default_bur = data.defaultBUR !== null ? data.defaultBUR : 0;
  }
}
