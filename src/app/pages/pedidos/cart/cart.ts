import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent {
  orderService = inject(OrderService);
  private router = inject(Router);

  paymentMethod = 'tarjeta';
  orderPlaced = false;

  updateQty(productId: number, qty: number): void {
    this.orderService.updateQuantity(productId, qty);
  }

  remove(productId: number): void {
    this.orderService.removeFromCart(productId);
  }

  placeOrder(): void {
    this.orderPlaced = true;
    setTimeout(() => {
      this.orderService.clearCart();
      this.router.navigate(['/pedido/1002']);
    }, 2000);
  }
}
