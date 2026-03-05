import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GradeResponseDto {
  id: number;
  value: string;
  numericValue: number;
  studentName: string;
  courseName: string;
  description: string; 
}

export interface GradeRequestDto {
  value: string;
  studentId: number;
  courseId: number;
  description: string;
}

export interface StudentCourseSummaryDto {
  courseName: string;
  teacherName: string;
  grades: GradeResponseDto[];
  averageGrade: number;
}

export interface CourseTeacherReportDto {
  studentsPerformance: StudentPerformanceDto[];
}

export interface StudentPerformanceDto {
  fullStudentName: string;
  avg: number;
}

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  private apiUrl = 'https://uniportal-r6nm.onrender.com/api/grade';

  constructor(private http: HttpClient) { }

  public addGrade(request: GradeRequestDto): Observable<GradeResponseDto> {
    return this.http.post<GradeResponseDto>(`${this.apiUrl}`, request);
  }

  public getAllStudentGrades(studentId: number): Observable<GradeResponseDto[]> {
    return this.http.get<GradeResponseDto[]>(`${this.apiUrl}/student/${studentId}`);
  }

  public getStudentCourseSummary(studentId: number, courseId: number): Observable<StudentCourseSummaryDto> {
    return this.http.get<StudentCourseSummaryDto>(`${this.apiUrl}/summary/${studentId}/${courseId}`);
  }

  public getTeacherReport(courseId: number): Observable<CourseTeacherReportDto> {
    return this.http.get<CourseTeacherReportDto>(`${this.apiUrl}/course/${courseId}/report`);
  }



  public deleteGrade(gradeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${gradeId}`);
  }

}