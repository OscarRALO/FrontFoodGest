import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService, Product } from '../../../core/services/product.service';
import { ReviewService, Review } from '../../../core/services/review.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card';

interface Producer { id: number; name: string; location: string; phone: string; email: string; bio: string; since: string; rating: number; totalSales: number; }

const MOCK_PRODUCERS: Producer[] = [
  { id: 1, name: 'Juan Huamán', location: 'Cusco, Perú', phone: '+51 987 654 321', email: 'juan@agro.com', bio: 'Agricultor orgánico con más de 15 años de experiencia cultivando quinua y maíz en los valles del Cusco. Comprometido con la agricultura sostenible.', since: '2020', rating: 4.8, totalSales: 450 },
  { id: 2, name: 'María Quispe', location: 'Junín, Perú', phone: '+51 976 543 210', email: 'maria@agro.com', bio: 'Productora de frutas y verduras orgánicas en Junín. Especialista en paltas y jengibre de alta calidad.', since: '2021', rating: 4.9, totalSales: 380 },
  { id: 5, name: 'Carlos Mendoza', location: 'Arequipa, Perú', phone: '+51 954 321 098', email: 'carlos@agro.com', bio: 'Productor de espárragos y uvas en los valles de Arequipa. Exportador con certificación GlobalGAP.', since: '2019', rating: 4.7, totalSales: 520 },
  { id: 6, name: 'Ana Torres', location: 'Cajamarca, Perú', phone: '+51 943 210 987', email: 'ana@agro.com', bio: 'Cafetalera de especialidad en Cajamarca. Ganadora de premios nacionales de café de calidad.', since: '2022', rating: 4.7, totalSales: 210 }
];

@Component({
  selector: 'app-producer-profile',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProducerProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private reviewService = inject(ReviewService);

  producer: Producer | undefined;
  products: Product[] = [];
  reviews: Review[] = [];
  loading = true;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.producer = MOCK_PRODUCERS.find(p => p.id === id);
    this.loading = false;
    if (this.producer) {
      this.productService.getProductsByProducer(id).subscribe(p => this.products = p);
      this.reviewService.getReviewsByProducer(id).subscribe(r => this.reviews = r);
    }
  }

  getStars(rating: number): number[] { return Array(Math.floor(rating)).fill(0); }
}
