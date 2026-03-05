import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  selectedRole = signal('student');
  errorMessage: string | null = null;


  studentData = {
    firstName: '',
    lastName: '',
    password: '',
    role: 'STUDENT'
  }

  teacherData = {
    firstName: '',
    lastName: '',
    password: '',
    academicTitle: '',
    departmentName: '',
    role: 'TEACHER'
  }
  repeatPassword = '';

  constructor(private auth: AuthService, private router: Router, private cdr: ChangeDetectorRef) { }

  setRole(role: string) {
    this.selectedRole.set(role);
  }

  onRegister() {
    const isStudent = this.selectedRole() === 'student';
    const data = isStudent ? this.studentData : this.teacherData;

    if (data.password !== this.repeatPassword) {
      alert("Passwords are not the same!");
      return;
    }

    const registration$ = isStudent
      ? this.auth.registerStudent(this.studentData)
      : this.auth.registerTeacher(this.teacherData);

    registration$.subscribe({
      next: (res) => {
        console.log(`${isStudent ? 'Student' : 'Teacher'} saved!`, res);

        if (res.token) {
          localStorage.setItem('token', res.token);
          const targetPath = isStudent ? '/student/dashboard' : '/teacher/dashboard';
          this.router.navigate([targetPath]);
        }
      },
      error: (err) => {
        console.error('Registration error', err);
        this.errorMessage = 'Please fill all the forms correctly!';
        this.cdr.detectChanges();
      }
    });
  }
}