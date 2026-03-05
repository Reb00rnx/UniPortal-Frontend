import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  isStudent = false;
  isTeacher = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.isStudent = this.authService.isStudent();
    this.isTeacher = this.authService.isTeacher();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }
}