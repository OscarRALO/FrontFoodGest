import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Review {
  id: number;
  productId: number;
  producerId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const MOCK_REVIEWS: Review[] = [
  { id: 1, productId: 1, producerId: 1, userName: 'Laura Méndez', rating: 5, comment: 'Excelente quinua, la mejor que he probado. Muy limpia y de gran calidad.', date: '2026-05-28' },
  { id: 2, productId: 1, producerId: 1, userName: 'Diego Ramírez', rating: 4, comment: 'Buen producto, llegó en perfectas condiciones. Repetiré pedido.', date: '2026-05-25' },
  { id: 3, productId: 2, producerId: 2, userName: 'Sofía Vargas', rating: 5, comment: 'Las paltas llegaron en su punto perfecto de maduración. Increíbles.', date: '2026-06-01' },
  { id: 4, productId: 2, producerId: 2, userName: 'Andrés López', rating: 5, comment: 'Calidad de exportación. Mis clientes quedaron encantados.', date: '2026-05-30' },
  { id: 5, productId: 3, producerId: 6, userName: 'Carmen Rojas', rating: 5, comment: 'Café excepcional. Las notas de chocolate son increíbles.', date: '2026-05-20' },
  { id: 6, productId: 3, producerId: 6, userName: 'Miguel Ángel', rating: 4, comment: 'Muy buen café, tostado perfecto para espresso.', date: '2026-05-18' },
  { id: 7, productId: 6, producerId: 5, userName: 'Patricia Herrera', rating: 5, comment: 'Cacao de aroma excepcional. Perfecto para nuestros chocolates.', date: '2026-06-05' },
  { id: 8, productId: 6, producerId: 5, userName: 'Fernando Castro', rating: 5, comment: 'Sin duda el mejor cacao fino que hemos encontrado en Perú.', date: '2026-06-02' },
  { id: 9, productId: 5, producerId: 5, userName: 'Isabel Gutiérrez', rating: 4, comment: 'Papas de colores hermosos. Sabor auténtico.', date: '2026-05-15' },
  { id: 10, productId: 11, producerId: 6, userName: 'Roberto Díaz', rating: 5, comment: 'Arándanos enormes y dulces. Excelente calidad.', date: '2026-06-12' },
  { id: 11, productId: 8, producerId: 5, userName: 'Lucía Flores', rating: 4, comment: 'Espárragos muy frescos, llegaron en perfecto estado.', date: '2026-06-09' },
  { id: 12, productId: 4, producerId: 1, userName: 'Eduardo Paredes', rating: 5, comment: 'Maíz morado perfecto para chicha. Color intenso.', date: '2026-04-15' }
];

@Injectable({ providedIn: 'root' })
export class ReviewService {
  getReviewsByProduct(productId: number): Observable<Review[]> {
    return of(MOCK_REVIEWS.filter(r => r.productId === productId)).pipe(delay(300));
  }

  getReviewsByProducer(producerId: number): Observable<Review[]> {
    return of(MOCK_REVIEWS.filter(r => r.producerId === producerId)).pipe(delay(300));
  }

  getAllReviews(): Observable<Review[]> {
    return of(MOCK_REVIEWS).pipe(delay(300));
  }
}
