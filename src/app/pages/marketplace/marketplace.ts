import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../shared/components/product-card/product-card';
import { ProductService, Product } from '../../core/services/product.service';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [FormsModule, ProductCardComponent],
  templateUrl: './marketplace.html',
  styleUrl: './marketplace.css'
})
export class MarketplaceComponent implements OnInit {
  private productService = inject(ProductService);

  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;
  searchQuery = '';
  selectedCategory = '';
  selectedLocation = '';
  onlyOrganic = false;
  minRating = 0;
  categories: string[] = [];
  locations: string[] = [];
  showFilters = false;

  ngOnInit(): void {
    this.categories = this.productService.getCategories();
    this.locations = this.productService.getLocations();
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
      this.loading = false;
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let result = [...this.products];
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.producerName.toLowerCase().includes(q)
      );
    }
    if (this.selectedCategory) result = result.filter(p => p.category === this.selectedCategory);
    if (this.selectedLocation) result = result.filter(p => p.producerLocation === this.selectedLocation);
    if (this.onlyOrganic) result = result.filter(p => p.organic);
    if (this.minRating > 0) result = result.filter(p => p.rating >= this.minRating);
    this.filteredProducts = result;
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedLocation = '';
    this.onlyOrganic = false;
    this.minRating = 0;
    this.filteredProducts = [...this.products];
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
}
