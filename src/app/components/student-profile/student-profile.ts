import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/user/user';
import { AuthService } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';
import { GradeService, GradeResponseDto } from '../../services/grade/grade';
import { ScheduleService, ScheduleEventDto } from '../../services/schedule/schedule';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfileComponent implements OnInit {
  user: any;
  courseAverages: { name: string, average: number }[] = [];
  upcomingEvents: ScheduleEventDto[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private gradeService: GradeService,
    private scheduleService: ScheduleService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.loadUserData();
    this.loadUpcomingEvents();
  }

  private loadUserData() {
    const userId = this.authService.getUserId();
    if (!userId) return;

    this.userService.getUserById(userId).subscribe({
      next: (data) => {
        this.user = data;
        this.loadGrades(userId);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('User error:', err),
    });
  }

  private loadGrades(studentId: number) {
    this.gradeService.getAllStudentGrades(studentId).subscribe({
      next: (grades: GradeResponseDto[]) => {
        const groups = grades.reduce(
          (acc, grade) => {
            const name = grade.courseName;
            if (!acc[name]) {
              acc[name] = { sum: 0, count: 0 };
            }
            acc[name].sum += grade.numericValue;
            acc[name].count++;
            return acc;
          },
          {} as Record<string, { sum: number; count: number }>
        );

        this.courseAverages = Object.keys(groups).map((name) => ({
          name: name,
          average: groups[name].sum / groups[name].count
        }));
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading grades:', err),
    });
  }

  private loadUpcomingEvents() {
    const userId = this.authService.getUserId();
    if (!userId) return;

    this.scheduleService.getEvents(userId).subscribe({
      next: (events) => {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000;
        const localISOTime = new Date(now.getTime() - offset).toISOString();
        const todayStr = localISOTime.split('T')[0];

        this.upcomingEvents = events
          .filter((e) => e.eventDate >= todayStr)
          .sort((a, b) => a.eventDate.localeCompare(b.eventDate))
          .slice(0, 5);

        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading schedule:', err),
    });
  }
}