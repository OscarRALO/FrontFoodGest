import { Injectable, signal, computed } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product } from './product.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderTimeline {
  status: string;
  date: string;
  description: string;
  completed: boolean;
}

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  status: 'confirmado' | 'preparacion' | 'en_camino' | 'entregado' | 'cancelado';
  statusLabel: string;
  paymentMethod: string;
  createdAt: string;
  estimatedDelivery: string;
  buyerName: string;
  timeline: OrderTimeline[];
}

const MOCK_ORDERS: Order[] = [
  {
    id: 1001, items: [], total: 450.00, status: 'entregado', statusLabel: 'Entregado',
    paymentMethod: 'Transferencia', createdAt: '2026-05-20', estimatedDelivery: '2026-05-25',
    buyerName: 'Roberto Gómez',
    timeline: [
      { status: 'Pedido confirmado', date: '20 May 2026', description: 'Tu pedido ha sido recibido', completed: true },
      { status: 'En preparación', date: '21 May 2026', description: 'El productor está preparando tu pedido', completed: true },
      { status: 'En camino', date: '23 May 2026', description: 'Tu pedido está en camino', completed: true },
      { status: 'Entregado', date: '25 May 2026', description: 'Pedido entregado exitosamente', completed: true }
    ]
  },
  {
    id: 1002, items: [], total: 280.50, status: 'en_camino', statusLabel: 'En Camino',
    paymentMethod: 'Tarjeta', createdAt: '2026-06-10', estimatedDelivery: '2026-06-15',
    buyerName: 'Roberto Gómez',
    timeline: [
      { status: 'Pedido confirmado', date: '10 Jun 2026', description: 'Tu pedido ha sido recibido', completed: true },
      { status: 'En preparación', date: '11 Jun 2026', description: 'El productor está preparando tu pedido', completed: true },
      { status: 'En camino', date: '13 Jun 2026', description: 'Tu pedido está en camino', completed: true },
      { status: 'Entregado', date: '-', description: 'Pendiente', completed: false }
    ]
  },
  {
    id: 1003, items: [], total: 890.00, status: 'preparacion', statusLabel: 'En Preparación',
    paymentMethod: 'Contra entrega', createdAt: '2026-06-13', estimatedDelivery: '2026-06-18',
    buyerName: 'Alimentos del Sur S.A.C.',
    timeline: [
      { status: 'Pedido confirmado', date: '13 Jun 2026', description: 'Tu pedido ha sido recibido', completed: true },
      { status: 'En preparación', date: '14 Jun 2026', description: 'El productor está preparando tu pedido', completed: true },
      { status: 'En camino', date: '-', description: 'Pendiente', completed: false },
      { status: 'Entregado', date: '-', description: 'Pendiente', completed: false }
    ]
  },
  {
    id: 1004, items: [], total: 125.00, status: 'confirmado', statusLabel: 'Confirmado',
    paymentMethod: 'Tarjeta', createdAt: '2026-06-14', estimatedDelivery: '2026-06-19',
    buyerName: 'Roberto Gómez',
    timeline: [
      { status: 'Pedido confirmado', date: '14 Jun 2026', description: 'Tu pedido ha sido recibido', completed: true },
      { status: 'En preparación', date: '-', description: 'Pendiente', completed: false },
      { status: 'En camino', date: '-', description: 'Pendiente', completed: false },
      { status: 'Entregado', date: '-', description: 'Pendiente', completed: false }
    ]
  },
  {
    id: 1005, items: [], total: 340.00, status: 'cancelado', statusLabel: 'Cancelado',
    paymentMethod: 'Transferencia', createdAt: '2026-06-01', estimatedDelivery: '-',
    buyerName: 'Roberto Gómez',
    timeline: [
      { status: 'Pedido confirmado', date: '01 Jun 2026', description: 'Tu pedido ha sido recibido', completed: true },
      { status: 'Cancelado', date: '02 Jun 2026', description: 'Pedido cancelado por el comprador', completed: true }
    ]
  }
];

@Injectable({ providedIn: 'root' })
export class OrderService {
  private cartItems = signal<CartItem[]>([]);
  readonly cart = this.cartItems.asReadonly();
  readonly cartCount = computed(() => this.cartItems().reduce((acc, i) => acc + i.quantity, 0));
  readonly cartTotal = computed(() => this.cartItems().reduce((acc, i) => acc + i.product.price * i.quantity, 0));

  addToCart(product: Product, quantity: number = 1): void {
    const items = [...this.cartItems()];
    const idx = items.findIndex(i => i.product.id === product.id);
    if (idx >= 0) {
      items[idx] = { ...items[idx], quantity: items[idx].quantity + quantity };
    } else {
      items.push({ product, quantity });
    }
    this.cartItems.set(items);
  }

  removeFromCart(productId: number): void {
    this.cartItems.set(this.cartItems().filter(i => i.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) { this.removeFromCart(productId); return; }
    const items = this.cartItems().map(i => i.product.id === productId ? { ...i, quantity } : i);
    this.cartItems.set(items);
  }

  clearCart(): void { this.cartItems.set([]); }

  getOrders(): Observable<Order[]> {
    return of(MOCK_ORDERS).pipe(delay(400));
  }

  getOrderById(id: number): Observable<Order | undefined> {
    return of(MOCK_ORDERS.find(o => o.id === id)).pipe(delay(300));
  }
}
