import { SlidingDTO } from './../dtos/sliding.dto';
import { SurveyDTO } from './../dtos/survey.dto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  
  private apiUrl          = `${environment.apiBaseUrl}surveys`;
  private apiUrlDelete    = `${environment.apiBaseUrl}surveys/delete`;
  private apiUrlSliding   = `${environment.apiBaseUrl}surveys/sliding`;
  private apiUrlCalSurvey = `${environment.apiBaseUrl}surveys/calculator-surveys`;

  constructor(private http: HttpClient) {}

  // Ham create Survey trong service
  insertSurvey(SurveyDTO: SurveyDTO): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, SurveyDTO, { headers });
  }

  // Ham get all Survey trong service
  getAllSurveys(): Observable<any> {
    // get survey from api
    return this.http.get<SurveyDTO>(this.apiUrl);
  }

  // Ham get all calculated survey
  updateAllSurveys(): Observable<any> {
    return this.http.get<SurveyDTO>(this.apiUrlCalSurvey);
  }

  // Clear all data
  clearData(): Observable<any> {
    return this.http.delete<any>(this.apiUrlDelete);
  }

  // update surveys list whenver update sliding
  updateSliding(SlidingDTO: SlidingDTO): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrlSliding, SlidingDTO, { headers });
  }

  // delete survey by ID
  deleteSurveyByID(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // get survey by ID
  getSurveyById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // update survey by Id
  updateSurveyById(SurveyDTO: SurveyDTO, id: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(
      `${this.apiUrl}/${id}`,
      SurveyDTO,
      { headers }
    );
  }
}
