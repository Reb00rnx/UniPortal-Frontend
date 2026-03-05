import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  userRole: string | null = null;
  isStudent = false;
  isTeacher = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    this.isStudent = this.authService.isStudent();
    this.isTeacher = this.authService.isTeacher();
  }
}
