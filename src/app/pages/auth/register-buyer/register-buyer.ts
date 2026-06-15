import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register-buyer',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register-buyer.html',
  styleUrl: './register-buyer.css'
})
export class RegisterBuyerComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  name = '';
  email = '';
  phone = '';
  password = '';
  company = '';
  ruc = '';
  address = '';
  buyerType = '';
  loading = false;
  error = '';

  buyerTypes = ['Restaurante', 'Minorista', 'Mayorista', 'Exportador', 'Hotel', 'Catering'];

  onSubmit(): void {
    if (!this.name || !this.email || !this.password || !this.company || !this.buyerType) {
      this.error = 'Por favor, completa todos los campos obligatorios.';
      return;
    }
    this.loading = true;
    this.error = '';
    this.authService.registerBuyer({
      name: this.name, email: this.email, phone: this.phone,
      password: this.password, company: this.company, buyerType: this.buyerType
    }).subscribe(res => {
      this.loading = false;
      if (res.success) this.router.navigate(['/marketplace']);
      else this.error = res.message;
    });
  }
}
