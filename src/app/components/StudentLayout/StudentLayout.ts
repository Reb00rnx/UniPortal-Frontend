import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './StudentLayout.html',
  styleUrl: './StudentLayout.css',
})
export class StudentLayout {

  constructor(private router: Router) { }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    console.log("User logged out");
  }

}
