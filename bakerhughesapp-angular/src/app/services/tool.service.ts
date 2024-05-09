import { ToolDTO } from './../dtos/tool.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root',
})
export class ToolService {
  private apiUrl = `${environment.apiBaseUrl}tool`;

  constructor(private http: HttpClient) {}

  // Ham create tool trong serive
  createTool(ToolDTO: ToolDTO): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.apiUrl, ToolDTO, { headers });
  }

  // Get tool by ID
  getToolById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        if (error.status === 500) {
          console.error('Internal server error:', error);
          return of(null); // Return null when 500 error occurs
        } else {
          return throwError(() => error); // Propagate other errors
        }
      })
    );
  }

  // Update tool by ID
  updateToolById(ToolDTO: ToolDTO, id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/${id}`, ToolDTO, {
      headers,
    });
  }
}
