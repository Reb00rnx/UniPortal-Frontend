import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user';
import { AuthService } from '../../services/auth/auth';
import { ScheduleService, ScheduleEventDto } from '../../services/schedule/schedule';
import { CourseService } from '../../services/course/course';
import { FormsModule } from "@angular/forms";
import { ConsultationsService, ConsultationRequestDto } from '../../services/consultations/consultations';


interface ConsultationData {
  con_day: string;
  startTime: string;
  endTime: string;
  room: string;
}


@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teacher-profile.html',
  styleUrl: './teacher-profile.css',
})

export class TeacherProfileComponent implements OnInit {

  user: any;
  teacherCourses: any[] = [];
  upcomingEvents: ScheduleEventDto[] = [];
  consultationData: ConsultationData = {
    con_day: 'MONDAY',
    startTime: '10:00',
    endTime: '12:00',
    room: 'A-214'
  }
  hasConsultation = false;
  isModalOpen = false;
  editConsultationData: ConsultationData = { ...this.consultationData };

  private userService = inject(UserService);
  private authService = inject(AuthService);
  private scheduleService = inject(ScheduleService);
  private courseService = inject(CourseService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private consultationService = inject(ConsultationsService)

  ngOnInit() {
    const userId = this.authService.getUserId();

    if (userId) {
      this.loadUserData(userId);
      this.loadUpcomingEvents(userId);
      this.getData(userId);
    } else {
      this.router.navigate(['/login']);
    }
  }


  openModal() {
    this.isModalOpen = true;
    this.cdr.detectChanges();
    this.editConsultationData = { ...this.consultationData }

  }

  closeModal() {
    this.editConsultationData = { ...this.consultationData }
    this.isModalOpen = false;
    this.cdr.detectChanges();
  }

  handleSave() {
    const request = this.editConsultationData as unknown as ConsultationRequestDto;
    if (this.hasConsultation) {
      this.updateData(request);
    } else {
      this.saveData(request);
    }
  }


  private getData(teacherId: number) {
    this.consultationService.getData(teacherId).subscribe({
      next: (data) => {
        this.consultationData = data;
        this.hasConsultation = true;
        this.cdr.detectChanges();

      },
      error: (err) => {
        console.log('Error loading consultations');

      }
    })
  }




  private saveData(request: ConsultationRequestDto) {
    request.teacherId = this.user.id;
    this.consultationService.saveData(request).subscribe({
      next: (data) => {
        this.consultationData = data;
        this.hasConsultation = true
        this.closeModal();
        this.cdr.detectChanges();

      },
      error: (err) => {
        console.log('Error while saving consultation');

      },
    })
  }

  private updateData(request: ConsultationRequestDto) {
    request.teacherId = this.user.id;
    this.consultationService.updateData(request, this.user.id).subscribe({
      next: (data) => {
        this.consultationData = data;
        this.closeModal();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Error while saving consultation');

      },
    })
  }




  private loadUserData(userId: number) {
    this.userService.getUserById(userId).subscribe({
      next: (data) => {
        this.user = data;
        this.loadTeacherCourses(userId);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Błąd pobierania danych użytkownika:', err),
    });
  }

  private loadTeacherCourses(userId: number) {
    this.courseService.getTeacherCourses(userId).subscribe({
      next: (courses) => {
        this.teacherCourses = courses || [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Błąd ładowania kursów:', err),
    });
  }

  private loadUpcomingEvents(userId: number) {
    this.scheduleService.getEvents(userId).subscribe({
      next: (events) => {
        const todayStr = new Date().toISOString().split('T')[0];

        this.upcomingEvents = events
          .filter((e) => e.eventDate >= todayStr)
          .sort((a, b) => a.eventDate.localeCompare(b.eventDate))
          .slice(0, 5);

        this.cdr.detectChanges();
      },
      error: (err) => console.error('Błąd ładowania planu zajęć:', err),
    });
  }


  get totalStudents(): number {
    return this.teacherCourses.reduce((sum, course) => sum + (course.students?.length || 0), 0);
  }


  viewCourse(courseId: string | number): void {
    this.router.navigate(['/teacher/courses', courseId]);
  }
}