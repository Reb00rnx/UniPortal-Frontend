import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService, CourseResponseDto } from '../../../services/course/course';
import { GradeService, GradeRequestDto, GradeResponseDto } from '../../../services/grade/grade';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const GRADE_MAP: { [key: string]: string } = {
  '5.0': 'FIVE', '4.5': 'FOUR_HALF', '4.0': 'FOUR',
  '3.5': 'THREE_HALF', '3.0': 'THREE', '2.0': 'TWO'
};

@Component({
  selector: 'app-gradebook',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gradebook.html',
  styleUrl: './gradebook.css'
})
export class GradebookComponent implements OnInit {
  course: CourseResponseDto | undefined;
  studentGradesMap: Map<number, GradeResponseDto[]> = new Map();


  addingToStudent: { id: number; firstName: string; lastName: string } | null = null;
  newGradeValue: string = '5.0';
  newGradeDescriptionText: string = '';


  viewingGrade: GradeResponseDto | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private gradeService: GradeService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const courseId = params.get('id');
      if (courseId) {
        this.loadCourseAndGrades(+courseId);
      }
    });
  }

  loadCourseAndGrades(courseId: number) {
    this.courseService.getCourseInfo(courseId).subscribe({
      next: (data) => {
        this.course = data;
        this.studentGradesMap.clear();
        this.course.students.forEach(s => {
          this.refreshStudentGrades(s.id, courseId);
        });
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading course', err)
    });
  }

  refreshStudentGrades(studentId: number, courseId: number) {
    this.gradeService.getStudentCourseSummary(studentId, courseId).subscribe({
      next: (summary) => {
        this.studentGradesMap.set(studentId, summary.grades);
        this.cdr.detectChanges();
      }
    });
  }

  openAddModal(student: any) {
    this.addingToStudent = student;
    this.newGradeValue = '5.0';
    this.newGradeDescriptionText = '';
  }

  closeAddModal() {
    this.addingToStudent = null;
  }

  confirmAddGrade() {
    if (!this.addingToStudent || !this.course) return;

    const request: GradeRequestDto = {
      value: GRADE_MAP[this.newGradeValue],
      studentId: this.addingToStudent.id,
      courseId: this.course.id,

      description: this.newGradeDescriptionText.trim() || 'Grade'
    };

    this.gradeService.addGrade(request).subscribe({
      next: () => {
        this.refreshStudentGrades(this.addingToStudent!.id, this.course!.id);
        this.closeAddModal();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Błąd walidacji backendu:', err)
    });
  }

  openView(grade: GradeResponseDto) {
    this.viewingGrade = grade;
  }

  closeView() {
    this.viewingGrade = null;
  }

  deleteGrade() {
    if (this.viewingGrade && confirm('Are you sure?')) {
      this.gradeService.deleteGrade(this.viewingGrade.id).subscribe({
        next: () => {

          if (this.course) {
            this.loadCourseAndGrades(this.course.id);
          }
          this.closeView();
        },
        error: (err) => console.error('Error while deleting grade', err)
      });
    }
  }
}