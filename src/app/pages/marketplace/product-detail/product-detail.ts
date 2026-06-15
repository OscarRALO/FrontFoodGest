import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../../core/services/product.service';
import { OrderService } from '../../../core/services/order.service';
import { ReviewService, Review } from '../../../core/services/review.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private orderService = inject(OrderService);
  private reviewService = inject(ReviewService);

  product: Product | undefined;
  reviews: Review[] = [];
  relatedProducts: Product[] = [];
  loading = true;
  quantity = 1;
  addedToCart = false;
  selectedImageIndex = 0;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe(p => {
      this.product = p;
      this.loading = false;
      if (p) {
        this.reviewService.getReviewsByProduct(p.id).subscribe(r => this.reviews = r);
        this.productService.getProducts().subscribe(all => {
          this.relatedProducts = all.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
        });
      }
    });
  }

  addToCart(): void {
    if (this.product) {
      this.orderService.addToCart(this.product, this.quantity);
      this.addedToCart = true;
      setTimeout(() => this.addedToCart = false, 2000);
    }
  }

  getCurrentPrice(): number {
    if (!this.product) return 0;
    const tier = this.product.priceTiers.find(t => this.quantity >= t.minQty && this.quantity <= t.maxQty);
    return tier ? tier.price : this.product.price;
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }
}
