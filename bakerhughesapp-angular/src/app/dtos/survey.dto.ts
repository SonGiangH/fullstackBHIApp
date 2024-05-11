export class SurveyDTO {
  id: number = 0;
  dp_length: number = 0;
  bit_depth: number;
  survey_depth: number;
  inc: number;
  azi: number;
  totalseen: number = 0;
  dlsWa: number = 0;
  dls30m: number = 0;
  motorYield: number = 0;
  toolface: string = '';
  st: number = 0;
  ed: number = 0;
  totalslid: number = 0;
  slidseen: number = 0;
  slidunseen: number = 0;
  meterAhead:number = 0;

  constructor(data: any) {
    this.dp_length = data.dpLength;
    this.bit_depth = data.bitDepth;
    this.survey_depth = data.surveyDepth;
    this.inc = data.inc;
    this.azi = data.azi;
    this.totalseen = data.totalseen;
    this.dlsWa = data.dlsWa;
    this.dls30m = data.dls30m;
    this.motorYield = data.motorYield;
    this.toolface = data.toolFace;
    this.st = data.st;
    this.ed = data.ed;
    this.totalslid = data.totalslid;
    this.slidseen = data.slidseen;
    this.slidunseen = data.slidunseen;
    this.meterAhead = data.meterAhead;
  }
}
