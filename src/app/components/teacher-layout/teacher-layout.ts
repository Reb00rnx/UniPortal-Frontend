import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
@Component({
  selector: 'app-teacher-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './teacher-layout.html',
  styleUrl: './teacher-layout.css',
})
export class TeacherLayout {

  constructor(private router: Router) { }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    console.log("User logged out");
  }
}
