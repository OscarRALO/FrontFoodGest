import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService, KPI, MonthlySales, ProductRanking } from '../../../core/services/analytics.service';
import { OrderService, Order } from '../../../core/services/order.service';

@Component({
  selector: 'app-dashboard-farmer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard-farmer.html',
  styleUrl: './dashboard-farmer.css'
})
export class DashboardFarmerComponent implements OnInit {
  private analyticsService = inject(AnalyticsService);
  private orderService = inject(OrderService);

  kpis: KPI[] = [];
  monthlySales: MonthlySales[] = [];
  productRanking: ProductRanking[] = [];
  recentOrders: Order[] = [];
  loading = true;
  maxSales = 0;

  ngOnInit(): void {
    this.analyticsService.getFarmerKPIs().subscribe(k => this.kpis = k);
    this.analyticsService.getMonthlySales().subscribe(s => {
      this.monthlySales = s;
      this.maxSales = Math.max(...s.map(m => m.sales));
    });
    this.analyticsService.getProductRanking().subscribe(r => this.productRanking = r);
    this.orderService.getOrders().subscribe(o => {
      this.recentOrders = o.slice(0, 4);
      this.loading = false;
    });
  }

  getBarHeight(sales: number): number {
    return (sales / this.maxSales) * 100;
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      confirmado: 'badge-info', preparacion: 'badge-warning',
      en_camino: 'badge-info', entregado: 'badge-success', cancelado: 'badge-error'
    };
    return map[status] || 'badge-info';
  }

  getTrendIcon(trend: string): string {
    return trend === 'up' ? 'trending_up' : trend === 'down' ? 'trending_down' : 'trending_flat';
  }

  getTrendClass(trend: string): string {
    return trend === 'up' ? 'trend-up' : trend === 'down' ? 'trend-down' : 'trend-stable';
  }
}
