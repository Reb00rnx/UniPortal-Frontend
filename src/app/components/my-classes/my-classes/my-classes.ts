import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CourseService, CourseResponseDto, CourseRequestDto } from '../../../services/course/course';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth';
import { RouterLink, RouterModule } from "@angular/router";

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-classes',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, FormsModule],
  templateUrl: './my-classes.html',
  styleUrl: './my-classes.css',
})
export class MyClassesComponent implements OnInit {


  isModalOpen: boolean = false;
  newCourse = {
    name: '',
    description: ''
  };


  courses: CourseResponseDto[] = [];

  constructor(private courseService: CourseService, private cdr: ChangeDetectorRef, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const teacherId = this.authService.getUserId();
    if (teacherId) {
      this.getTeacherCourses(teacherId);
    }
  }

  viewCourse(courseId: string | number): void {
    this.router.navigate(['/teacher/courses', courseId]);
  }

  private getTeacherCourses(teacherId: number) {
    this.courseService.getTeacherCourses(teacherId).subscribe({
      next: (data) => {
        this.courses = data.sort((a, b) => a.name.localeCompare(b.name));
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log("Error loading courses", err);
      }
    });
  }

  private createCourse(request: CourseRequestDto) {
    request.teacherId = this.authService.getUserId()!;
    this.courseService.createCourse(request).subscribe({
      next: (response) => {
        const teacherId = this.authService.getUserId();
        if (teacherId) {
          this.getTeacherCourses(teacherId);
        }

        this.isModalOpen = false;
        this.newCourse = { name: '', description: '' };
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Error creating course', err);

      }
    })
  }

  public handleSave() {
    if (!this.newCourse.name.trim()) return;
    const request: CourseRequestDto = {
      name: this.newCourse.name,
      description: this.newCourse.description,
      teacherId: 0,
      students: []
    };
    this.createCourse(request);
  }

  openModal() {
    this.isModalOpen = true;
    this.cdr.detectChanges();
  }

  closeModal() {
    this.isModalOpen = false;
    this.cdr.detectChanges();
  }

}
