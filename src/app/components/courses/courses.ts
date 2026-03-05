import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CourseService } from '../../services/course/course';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class CoursesComponent implements OnInit {

  courses: any[] = [];

  constructor(private courseService: CourseService, private cdr: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit() {
    this.loadCourses();
  }

  private loadCourses() {
  this.courseService.getAllCourses().subscribe(data => {
    this.courses = data;
    this.cdr.detectChanges();
  });
}

  enroll(courseId: number) {
    const studentId = this.authService.getUserId();

    if (!studentId) {
      alert('Please log in first!');
      return;
    }

    this.courseService.enrollStudent(courseId, studentId).subscribe({
      next: (response) => {
        alert('Successfully enrolled!');
        this.loadCourses();
      },
      error: (err: any) => {
        console.error('Full error details:', err);
        const message = err.error?.message || err.statusText || 'Connection error (CORS?)';
        alert('Error: ' + message);
      }
    });
  }

  isEnrolled(course: any): boolean {
    const currentUserId = this.authService.getUserId();
    if (!currentUserId || !course.students) return false;
    return course.students.some((student: any) => student.id == currentUserId);
  }


  hasAvailableCourses = (course: any): boolean => !this.isEnrolled(course);

  get anyAvailable(): boolean {
    return this.courses.some(course => !this.isEnrolled(course));
  }

  get hasJoinedAny(): boolean {
    return this.courses.some(course => this.isEnrolled(course));
  }

}

