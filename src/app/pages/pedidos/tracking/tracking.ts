import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService, Order } from '../../../core/services/order.service';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tracking.html',
  styleUrl: './tracking.css'
})
export class TrackingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);

  order: Order | undefined;
  loading = true;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrderById(id).subscribe(o => {
      this.order = o;
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
}
