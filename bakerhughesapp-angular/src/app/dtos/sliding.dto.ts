export class SlidingDTO {   
    surveyID: number =0;
    toolFace :string = '';
    st :number = 0;
    ed :number = 0;    

    constructor(data: any) {    
        this.surveyID = data.surveyID;
        this.toolFace = data.toolFace;
        this.st = data.st;
        this.ed = data.ed;       
    }
}