import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfileComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  editing = false;
  editName = '';
  editPhone = '';
  editEmail = '';
  saved = false;

  startEditing(): void {
    const user = this.authService.currentUser();
    if (user) {
      this.editName = user.name;
      this.editPhone = user.phone || '';
      this.editEmail = user.email;
      this.editing = true;
    }
  }

  saveProfile(): void {
    this.editing = false;
    this.saved = true;
    setTimeout(() => this.saved = false, 3000);
  }

  cancelEditing(): void {
    this.editing = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
