import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpResourceRef } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})



export class LoginComponent {

  selectedRole = signal('student');


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

  loginData = {
    email: '',
    password: ''
  }

  errorMessage: string | null = null;

  constructor(private auth: AuthService, private router: Router, private cdr: ChangeDetectorRef) { }

  setRole(role: string) {
    this.selectedRole.set(role);
  }

  onLogin() {
    this.auth.login(this.loginData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);


        const role = this.auth.getUserRole();
        const targetPath = role === 'STUDENT' ? '/student/dashboard' : '/teacher/dashboard';
        this.router.navigate([targetPath]);
      },
      error: (err) => {
        console.error('Invalid email or password', err);
        this.errorMessage = 'Invalid email or password';
        this.cdr.detectChanges();
      }
    });
  }

}

