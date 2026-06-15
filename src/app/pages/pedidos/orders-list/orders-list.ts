import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderService, Order } from '../../../core/services/order.service';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './orders-list.html',
  styleUrl: './orders-list.css'
})
export class OrdersListComponent implements OnInit {
  private orderService = inject(OrderService);
  orders: Order[] = [];
  loading = true;
  selectedFilter = 'todos';

  filters = [
    { value: 'todos', label: 'Todos' },
    { value: 'confirmado', label: 'Confirmados' },
    { value: 'preparacion', label: 'En Preparación' },
    { value: 'en_camino', label: 'En Camino' },
    { value: 'entregado', label: 'Entregados' },
    { value: 'cancelado', label: 'Cancelados' }
  ];

  get filteredOrders(): Order[] {
    if (this.selectedFilter === 'todos') return this.orders;
    return this.orders.filter(o => o.status === this.selectedFilter);
  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.loading = false;
    });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      confirmado: 'badge-info', preparacion: 'badge-warning',
      en_camino: 'badge-info', entregado: 'badge-success', cancelado: 'badge-error'
    };
    return map[status] || 'badge-info';
  }

  getStatusIcon(status: string): string {
    const map: Record<string, string> = {
      confirmado: 'check_circle', preparacion: 'inventory_2',
      en_camino: 'local_shipping', entregado: 'done_all', cancelado: 'cancel'
    };
    return map[status] || 'info';
  }
}
