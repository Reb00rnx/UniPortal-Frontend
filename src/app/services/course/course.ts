import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';





export interface CourseRequestDto {
  name: string;
  description: string;
  teacherId: number;
  students: number[];
}

export interface CourseResponseDto {
  id: number;
  name: string;
  description: string;
  code: string;
  teacher: TeacherResponseDto;
  students: StudentResponseDto[];
  modules: ModuleResponseDto[];
}

export interface StudentResponseDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  indexNumber: string;
}

export interface TeacherResponseDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  academicTitle: string;
  department: string;
}
export interface ModuleRequestDto {
  title: string;
  description: string;
  orderIndex: number;
}

export interface ModuleResponseDto {
  id: number;
  title: string;
  description: string;
  orderIndex: number;
}


@Injectable({
  providedIn: 'root',
})

export class CourseService {

  private readonly apiUrl = 'https://uniportal-r6nm.onrender.com/api/courses';

  constructor(private http: HttpClient) { }

  public createCourse(request: CourseRequestDto): Observable<CourseResponseDto> {
    return this.http.post<CourseResponseDto>(`${this.apiUrl}`, request)
  }

  public getAllCourses(): Observable<CourseResponseDto[]> {

    return this.http.get<CourseResponseDto[]>(`${this.apiUrl}/all`);
  }

  public deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`)
  }

  public enrollStudent(courseId: number, studentId: number): Observable<CourseResponseDto> {
    return this.http.patch<CourseResponseDto>(`${this.apiUrl}/${courseId}/enroll/${studentId}`, {});
  }

  public getCourseInfo(courseId: number): Observable<CourseResponseDto> {
    return this.http.get<CourseResponseDto>(`${this.apiUrl}/${courseId}`)
  }

  public getTeacherCourses(teacherId: number): Observable<CourseResponseDto[]> {
    return this.http.get<CourseResponseDto[]>(`${this.apiUrl}/teacher/${teacherId}`);
  }

  public addModule(courseId: number, request: ModuleRequestDto): Observable<ModuleResponseDto> {
    return this.http.post<ModuleResponseDto>(`${this.apiUrl}/${courseId}/modules`, request);
  }

  public deleteModule(moduleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/modules/${moduleId}`);
  }






}
