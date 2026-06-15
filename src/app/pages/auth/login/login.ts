import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  rememberMe = false;
  loading = false;
  error = '';

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.error = 'Por favor, completa todos los campos.';
      return;
    }
    this.loading = true;
    this.error = '';
    this.authService.login(this.email, this.password).subscribe(res => {
      this.loading = false;
      if (res.success) {
        const user = res.data;
        if (user?.role === 'admin') this.router.navigate(['/admin']);
        else if (user?.role === 'productor') this.router.navigate(['/dashboard']);
        else this.router.navigate(['/marketplace']);
      } else {
        this.error = res.message;
      }
    });
  }
}
