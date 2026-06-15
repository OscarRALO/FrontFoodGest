import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card';
import { ProductService, Product } from '../../core/services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  featuredProducts: Product[] = [];
  loading = true;

  teamMembers = [
    { name: 'Integrante 1', role: 'Frontend Developer', initials: 'I1', color: '#2E7D32' },
    { name: 'Integrante 2', role: 'Backend Developer', initials: 'I2', color: '#66BB6A' },
    { name: 'Integrante 3', role: 'UI/UX Designer', initials: 'I3', color: '#F9A825' },
    { name: 'Integrante 4', role: 'Project Manager', initials: 'I4', color: '#4CAF50' },
    { name: 'Integrante 5', role: 'QA Tester', initials: 'I5', color: '#1B5E20' }
  ];

  stats = [
    { value: 500, suffix: '+', label: 'Productores', icon: 'agriculture' },
    { value: 2000, suffix: '+', label: 'Productos', icon: 'inventory_2' },
    { value: 10000, suffix: '+', label: 'Pedidos', icon: 'local_shipping' },
    { value: 98, suffix: '%', label: 'Satisfacción', icon: 'thumb_up' }
  ];

  benefits = [
    { icon: 'spa', title: 'Productos Frescos', desc: 'Directamente del campo a tu mesa. Sin intermediarios, máxima frescura garantizada.' },
    { icon: 'handshake', title: 'Conexión Directa', desc: 'Conecta directamente con productores locales. Conoce el origen de tus alimentos.' },
    { icon: 'savings', title: 'Precio Justo', desc: 'Precios justos para productores y compradores. Sin comisiones excesivas.' }
  ];

  steps = [
    { number: '01', title: 'Busca', desc: 'Explora nuestro catálogo de productos frescos de todo el Perú.', icon: 'search' },
    { number: '02', title: 'Conecta', desc: 'Elige directamente del productor y negocia el mejor precio.', icon: 'connect_without_contact' },
    { number: '03', title: 'Recibe', desc: 'Recibe tus productos frescos en la puerta de tu negocio.', icon: 'inventory' }
  ];

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe(products => {
      this.featuredProducts = products;
      this.loading = false;
    });
  }
}
