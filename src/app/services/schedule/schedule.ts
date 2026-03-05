import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface ScheduleEventDto {
  id?: number; 
  title: string;
  eventDate: string;
}


@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private apiUrl = 'https://uniportal-r6nm.onrender.com/api/schedule';

  constructor(private http: HttpClient) { }

  public addEvent(request: ScheduleEventDto, userId: number): Observable<ScheduleEventDto> {
    return this.http.post<ScheduleEventDto>(`${this.apiUrl}/${userId}/add`, request);
  }


  public getEvents(userId: number): Observable<ScheduleEventDto[]> {
    return this.http.get<ScheduleEventDto[]>(`${this.apiUrl}/${userId}/all`);
  }
}
