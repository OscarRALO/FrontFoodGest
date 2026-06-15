import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface KPI {
  label: string;
  value: string;
  change: number;
  icon: string;
}

export interface MonthlySales {
  month: string;
  sales: number;
}

export interface ProductRanking {
  rank: number;
  name: string;
  sales: number;
  revenue: number;
  trend: 'up' | 'down' | 'stable';
}

export interface PlatformStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  activeProducers: number;
  pendingApprovals: number;
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  getFarmerKPIs(): Observable<KPI[]> {
    return of([
      { label: 'Ventas del Mes', value: 'S/ 4,850', change: 12.5, icon: 'trending_up' },
      { label: 'Pedidos Activos', value: '18', change: 8.3, icon: 'shopping_cart' },
      { label: 'Clientes', value: '42', change: 15.2, icon: 'people' },
      { label: 'Ingresos Totales', value: 'S/ 28,400', change: 22.1, icon: 'account_balance_wallet' }
    ]).pipe(delay(300));
  }

  getMonthlySales(): Observable<MonthlySales[]> {
    return of([
      { month: 'Ene', sales: 2400 }, { month: 'Feb', sales: 3100 },
      { month: 'Mar', sales: 2800 }, { month: 'Abr', sales: 3500 },
      { month: 'May', sales: 4200 }, { month: 'Jun', sales: 4850 }
    ]).pipe(delay(300));
  }

  getProductRanking(): Observable<ProductRanking[]> {
    return of([
      { rank: 1, name: 'Quinua Orgánica', sales: 145, revenue: 1812, trend: 'up' as const },
      { rank: 2, name: 'Café de Altura', sales: 89, revenue: 3115, trend: 'up' as const },
      { rank: 3, name: 'Palta Hass', sales: 210, revenue: 1428, trend: 'stable' as const },
      { rank: 4, name: 'Cacao Fino', sales: 67, revenue: 1206, trend: 'up' as const },
      { rank: 5, name: 'Arándano Premium', sales: 45, revenue: 990, trend: 'down' as const }
    ]).pipe(delay(300));
  }

  getPlatformStats(): Observable<PlatformStats> {
    return of({
      totalUsers: 1250, totalProducts: 340, totalOrders: 2840,
      totalRevenue: 185000, activeProducers: 86, pendingApprovals: 12
    }).pipe(delay(300));
  }
}
