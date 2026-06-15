import { Component, inject, OnInit } from '@angular/core';
import { AnalyticsService, PlatformStats } from '../../../core/services/analytics.service';
import { AuthService, User } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
  private analyticsService = inject(AnalyticsService);
  private authService = inject(AuthService);

  stats: PlatformStats | null = null;
  allUsers: User[] = [];
  pendingUsers: User[] = [];
  loading = true;

  ngOnInit(): void {
    this.analyticsService.getPlatformStats().subscribe(s => this.stats = s);
    this.authService.getAllUsers().subscribe(u => {
      this.allUsers = u.filter(x => x.role === 'productor');
      this.loading = false;
    });
    this.authService.getPendingUsers().subscribe(u => this.pendingUsers = u);
  }

  getStatusClass(status: string | undefined): string {
    if (status === 'activo') return 'badge-success';
    if (status === 'pendiente') return 'badge-warning';
    return 'badge-error';
  }

  approveUser(user: User): void {
    user.status = 'activo';
    this.pendingUsers = this.pendingUsers.filter(u => u.id !== user.id);
  }
}
