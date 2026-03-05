import { Component, OnInit } from '@angular/core';
import { GradeService, StudentCourseSummaryDto, GradeResponseDto } from '../../services/grade/grade';
import { AuthService } from '../../services/auth/auth';
import { ChangeDetectorRef } from '@angular/core';

type GroupedGrades = { [courseName: string]: GradeResponseDto[] };
@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [],
  templateUrl: './grades.html',
  styleUrl: './grades.css',
})
export class GradesComponent implements OnInit {

  viewingGrade: any = null;

  allGrades: GradeResponseDto[] = [];

  groupedGrades: GroupedGrades = {};


  constructor(private gradeService: GradeService, private authService: AuthService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.gradeService.getAllStudentGrades(userId).subscribe({
        next: (data) => {
          this.groupedGrades = data.reduce((acc, grade) => {
            if (!acc[grade.courseName]) {
              acc[grade.courseName] = [];
            }
            acc[grade.courseName].push(grade);
            return acc;
          }, {} as GroupedGrades);

          this.cdr.detectChanges();
        }
      });
    }
  }

  getCourseNames() {
    return Object.keys(this.groupedGrades);
  }



  openView(grade: any) {
    this.viewingGrade = grade;
    this.cdr.detectChanges();
  }

  closeView() {
    this.viewingGrade = null;
    this.cdr.detectChanges();

  }
}
