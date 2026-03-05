import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService, CourseResponseDto, ModuleRequestDto, ModuleResponseDto } from '../../services/course/course';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth';
@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetailComponent implements OnInit {
  course: CourseResponseDto | undefined;
  isTeacher: boolean = false;
  showAddForm = false;

  newModule: ModuleRequestDto = {
    title: '',
    description: '',
    orderIndex: 0
  };

  constructor(
    private courseService: CourseService,
    private activatedRout: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isTeacher = this.authService.getUserRole() === 'TEACHER';


    this.activatedRout.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadCourseData(+id);
      }
    });
  }

  loadCourseData(id: number) {
    this.courseService.getCourseInfo(id).subscribe({
      next: (data) => {
        this.course = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error while loading course data', err)
    });
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (this.showAddForm && this.course) {
      this.newModule.orderIndex = this.course.modules.length;
    }
  }

  saveModule() {
    if (!this.newModule.title.trim() || !this.course) return;

    this.courseService.addModule(this.course.id, this.newModule).subscribe({
      next: (savedModule) => {
        if (this.course) {
          this.course.modules = [...this.course.modules, savedModule];
        }

        this.showAddForm = false;
        this.resetNewModule();
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error saving module', err)
    });
  }

  private resetNewModule() {
    this.newModule = {
      title: '',
      description: '',
      orderIndex: this.course?.modules.length || 0
    };
  }

  deleteModule(moduleId: number) {
    if (confirm('Are you sure you want to delete this module?')) {
      this.courseService.deleteModule(moduleId).subscribe({
        next: () => {
          if (this.course) {
            this.course.modules = this.course.modules.filter(m => m.id !== moduleId);
            this.cdr.detectChanges();
          }
        },
        error: (err) => console.error('Error deleting module', err)
      });
    }
  }

  openConsultations() {
    window.open('https://gemini.google.com/app?hl=pl', '_blank');
  }

  openForum() {
    window.open('https://stackoverflow.com/questions', '_blank');
  }
}