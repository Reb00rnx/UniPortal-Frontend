import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { StudentLayout } from './components/StudentLayout/StudentLayout';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ContactComponent } from './components/contact/contact';
import { ScheduleComponent } from './components/schedule/schedule';
import { CoursesComponent } from './components/courses/courses';
import { PrivacyPolicyComponent } from './components/privacy-policy-component/privacy-policy-component';
import { authGuard } from './services/auth/guard';
import { StudentProfileComponent } from './components/student-profile/student-profile';
import { CourseDetailComponent } from './components/course-detail/course-detail';
import { GradesComponent } from './components/grades/grades';
import { TeacherLayout } from './components/teacher-layout/teacher-layout';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile';
import { MyClassesComponent } from './components/my-classes/my-classes/my-classes';
import { GradebookComponent } from './components/gradebook/gradebook/gradebook';
import { PrivacyPComponent } from './components/privacyP/privacy-p/privacy-p';
import { ContactPComponent } from './components/contactP/contact-p/contact-p';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contactP', component: ContactPComponent },
  { path: 'privacyP', component: PrivacyPComponent },

 // --- STUDENT ---
  {
    path: 'student',
    component: StudentLayout, 
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: StudentProfileComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'courses/:id', component: CourseDetailComponent },
      { path: 'grades', component: GradesComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'privacy', component: PrivacyPolicyComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // --- TEACHER ---
  {
    path: 'teacher',
    component: TeacherLayout, 
    canActivate: [authGuard], 
    children: [
      { path: 'dashboard', component: DashboardComponent }, 
      { path: 'profile', component: TeacherProfileComponent },
      { path: 'my-classes', component: MyClassesComponent },
      { path: 'courses/:id', component: CourseDetailComponent },
      { path: 'gradebook', component: GradebookComponent }, 
      { path: 'schedule', component: ScheduleComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'privacy', component: PrivacyPolicyComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },


  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
