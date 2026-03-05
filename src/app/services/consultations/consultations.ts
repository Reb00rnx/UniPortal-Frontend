import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface ConsultationResponseDto {
  id: number;
  con_day: string;
  startTime: string;
  endTime: string;
  room: string;
}

export interface ConsultationRequestDto {
  con_day: string;
  startTime: string;
  endTime: string;
  room: string;
  teacherId: number;
}



@Injectable({
  providedIn: 'root',
})
export class ConsultationsService {
  private readonly apiUrl = 'https://uniportal-r6nm.onrender.com/api/consultations';

  constructor(private http: HttpClient) { }


  public saveData(request: ConsultationRequestDto): Observable<ConsultationResponseDto> {
    return this.http.post<ConsultationResponseDto>(`${this.apiUrl}`, request);
  }

  public updateData(request: ConsultationRequestDto, teacherId: number): Observable<ConsultationResponseDto> {
    return this.http.patch<ConsultationResponseDto>(`${this.apiUrl}/update/${teacherId}`, request);
  }

  public getData(teacherId: number): Observable<ConsultationResponseDto> {
    return this.http.get<ConsultationResponseDto>(`${this.apiUrl}/${teacherId}`)
  }




}
