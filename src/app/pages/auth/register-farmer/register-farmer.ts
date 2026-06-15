import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register-farmer',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register-farmer.html',
  styleUrl: './register-farmer.css'
})
export class RegisterFarmerComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentStep = 1;
  totalSteps = 4;
  loading = false;
  success = false;

  // Step 1
  name = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';

  // Step 2
  department = '';
  province = '';
  address = '';
  parcelSize = '';

  // Step 3
  dniFile = '';
  farmDoc = '';

  departments = ['Cusco', 'Junín', 'Arequipa', 'Cajamarca', 'Ayacucho', 'Huancavelica', 'Lima', 'Piura', 'Ica', 'La Libertad'];

  nextStep(): void {
    if (this.currentStep < this.totalSteps) this.currentStep++;
    if (this.currentStep === 4) this.submitRegistration();
  }

  prevStep(): void {
    if (this.currentStep > 1) this.currentStep--;
  }

  onFileSelected(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      if (field === 'dni') this.dniFile = input.files[0].name;
      else this.farmDoc = input.files[0].name;
    }
  }

  submitRegistration(): void {
    this.loading = true;
    this.authService.registerFarmer({
      name: this.name, email: this.email, phone: this.phone,
      password: this.password, location: `${this.department}, ${this.province}`
    }).subscribe(() => {
      this.loading = false;
      this.success = true;
    });
  }
}
