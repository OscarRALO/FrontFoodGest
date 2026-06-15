import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface PriceTier {
  minQty: number;
  maxQty: number;
  price: number;
  unit: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  priceTiers: PriceTier[];
  images: string[];
  producerId: number;
  producerName: string;
  producerLocation: string;
  harvestDate: string;
  available: boolean;
  stock: number;
  rating: number;
  reviewCount: number;
  organic: boolean;
  featured: boolean;
}

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Quinua Orgánica', description: 'Quinua real orgánica cultivada en los Andes peruanos a más de 3,800 metros de altura. Grano de alta calidad, rico en proteínas.', category: 'Granos', price: 12.50, unit: 'kg', priceTiers: [{ minQty: 1, maxQty: 10, price: 12.50, unit: 'kg' }, { minQty: 11, maxQty: 50, price: 11.00, unit: 'kg' }, { minQty: 51, maxQty: 100, price: 9.50, unit: 'kg' }, { minQty: 101, maxQty: 9999, price: 8.00, unit: 'kg' }], images: [], producerId: 1, producerName: 'Juan Huamán', producerLocation: 'Cusco, Perú', harvestDate: '2026-06-01', available: true, stock: 500, rating: 4.8, reviewCount: 24, organic: true, featured: true },
  { id: 2, name: 'Palta Hass Premium', description: 'Palta Hass de primera calidad, cultivada en el valle de Moquegua. Textura cremosa y sabor incomparable.', category: 'Frutas', price: 6.80, unit: 'kg', priceTiers: [{ minQty: 1, maxQty: 10, price: 6.80, unit: 'kg' }, { minQty: 11, maxQty: 50, price: 5.90, unit: 'kg' }, { minQty: 51, maxQty: 100, price: 5.20, unit: 'kg' }, { minQty: 101, maxQty: 9999, price: 4.50, unit: 'kg' }], images: [], producerId: 2, producerName: 'María Quispe', producerLocation: 'Junín, Perú', harvestDate: '2026-05-20', available: true, stock: 800, rating: 4.9, reviewCount: 36, organic: false, featured: true },
  { id: 3, name: 'Café de Altura Especial', description: 'Café arábica de especialidad cultivado a 1,800 m.s.n.m. en Cajamarca. Notas de chocolate y caramelo.', category: 'Café', price: 35.00, unit: 'kg', priceTiers: [{ minQty: 1, maxQty: 5, price: 35.00, unit: 'kg' }, { minQty: 6, maxQty: 25, price: 30.00, unit: 'kg' }, { minQty: 26, maxQty: 50, price: 26.00, unit: 'kg' }, { minQty: 51, maxQty: 9999, price: 22.00, unit: 'kg' }], images: [], producerId: 6, producerName: 'Ana Torres', producerLocation: 'Cajamarca, Perú', harvestDate: '2026-05-15', available: true, stock: 200, rating: 4.7, reviewCount: 18, organic: true, featured: true },
  { id: 4, name: 'Maíz Morado', description: 'Maíz morado del Valle Sagrado para chicha morada. Alto contenido de antocianinas.', category: 'Granos', price: 4.50, unit: 'kg', priceTiers: [{ minQty: 1, maxQty: 20, price: 4.50, unit: 'kg' }, { minQty: 21, maxQty: 50, price: 3.80, unit: 'kg' }, { minQty: 51, maxQty: 100, price: 3.20, unit: 'kg' }, { minQty: 101, maxQty: 9999, price: 2.80, unit: 'kg' }], images: [], producerId: 1, producerName: 'Juan Huamán', producerLocation: 'Cusco, Perú', harvestDate: '2026-04-10', available: true, stock: 1200, rating: 4.5, reviewCount: 12, organic: false, featured: false },
  { id: 5, name: 'Papa Nativa Multicolor', description: 'Selección de papas nativas de colores de Huancavelica. Sabores únicos y tradicionales.', category: 'Tubérculos', price: 3.20, unit: 'kg', priceTiers: [{ minQty: 1, maxQty: 20, price: 3.20, unit: 'kg' }, { minQty: 21, maxQty: 50, price: 2.80, unit: 'kg' }, { minQty: 51, maxQty: 100, price: 2.40, unit: 'kg' }, { minQty: 101, maxQty: 9999, price: 2.00, unit: 'kg' }], images: [], producerId: 5, producerName: 'Rosa Chávez', producerLocation: 'Huancavelica, Perú', harvestDate: '2026-05-28', available: true, stock: 2000, rating: 4.6, reviewCount: 15, organic: true, featured: false },
  { id: 6, name: 'Cacao Fino de Aroma', description: 'Cacao criollo fino de aroma. Reconocido internacionalmente por su perfil aromático excepcional.', category: 'Cacao', price: 18.00, unit: 'kg', priceTiers: [{ minQty: 1, maxQty: 10, price: 18.00, unit: 'kg' }, { minQty: 11, maxQty: 50, price: 15.50, unit: 'kg' }, { minQty: 51, maxQty: 100, price: 13.00, unit: 'kg' }, { minQty: 101, maxQty: 9999, price: 11.00, unit: 'kg' }], images: [], producerId: 5, producerName: 'Pedro Flores', producerLocation: 'Ayacucho, Perú', harvestDate: '2026-05-05', available: true, stock: 300, rating: 4.9, reviewCount: 28, organic: true, featured: true },
  { id: 7, name: 'Mango Kent', description: 'Mango Kent de exportación de Piura. Fruto grande, jugoso y dulce.', category: 'Frutas', price: 4.00, unit: 'kg', priceTiers: [{ minQty: 1, maxQty: 20, price: 4.00, unit: 'kg' }, { minQty: 21, maxQty: 50, price: 3.50, unit: 'kg' }, { minQty: 51, maxQty: 100, price: 3.00, unit: 'kg' }, { minQty: 101, maxQty: 9999, price: 2.50, unit: 'kg' }], images: [], producerId: 2, producerName: 'María Quispe', producerLocation: 'Junín, Perú', harvestDate: '2026-03-15', available: true, stock: 600, rating: 4.4, reviewCount: 9, organic: false, featured: false },
  { id: 8, name: 'Espárrago Verde Fresco', description: 'Espárrago verde de Ica. Tallos firmes y tiernos, ideales para restaurantes.', category: 'Verduras', price: 8.50, unit: 'kg', priceTiers: [{ minQty: 1, maxQty: 10, price: 8.50, unit: 'kg' }, { minQty: 11, maxQty: 30, price: 7.20, unit: 'kg' }, { minQty: 31, maxQty: 60, price: 6.00, unit: 'kg' }, { minQty: 61, maxQty: 9999, price: 5.00, unit: 'kg' }], images: [], producerId: 5, producerName: 'Carlos Mendoza', producerLocation: 'Arequipa, Perú', harvestDate: '2026-06-08', available: true, stock: 350, rating: 4.7, reviewCount: 21, organic: false, featured: false },
  { id: 9, name: 'Alcachofa Sin Espinas', description: 'Alcachofa criolla cultivada en los valles interandinos de Junín.', category: 'Verduras', price: 5.60, unit: 'kg', priceTiers: [{ minQty: 1, maxQty: 15, price: 5.60, unit: 'kg' }, { minQty: 16, maxQty: 40, price: 4.80, unit: 'kg' }, { minQty: 41, maxQty: 80, price: 4.00, unit: 'kg' }, { minQty: 81, maxQty: 9999, price: 3.50, unit: 'kg' }], images: [], producerId: 2, producerName: 'María Quispe', producerLocation: 'Junín, Perú', harvestDate: '2026-05-30', available: true, stock: 400, rating: 4.3, reviewCount: 7, organic: false, featured: false },
  { id: 10, name: 'Uva Red Globe', description: 'Uva Red Globe de mesa cultivada en Ica.', category: 'Frutas', price: 5.00, unit: 'kg', priceTiers: [{ minQty: 1, maxQty: 10, price: 5.00, unit: 'kg' }, { minQty: 11, maxQty: 30, price: 4.30, unit: 'kg' }, { minQty: 31, maxQty: 60, price: 3.60, unit: 'kg' }, { minQty: 61, maxQty: 9999, price: 3.00, unit: 'kg' }], images: [], producerId: 5, producerName: 'Carlos Mendoza', producerLocation: 'Arequipa, Perú', harvestDate: '2026-04-20', available: true, stock: 550, rating: 4.6, reviewCount: 14, organic: false, featured: false },
  { id: 11, name: 'Arándano Premium', description: 'Arándanos frescos de La Libertad. Alto contenido de antioxidantes.', category: 'Frutas', price: 22.00, unit: 'kg', priceTiers: [{ minQty: 1, maxQty: 5, price: 22.00, unit: 'kg' }, { minQty: 6, maxQty: 20, price: 19.00, unit: 'kg' }, { minQty: 21, maxQty: 50, price: 16.00, unit: 'kg' }, { minQty: 51, maxQty: 9999, price: 13.00, unit: 'kg' }], images: [], producerId: 6, producerName: 'Ana Torres', producerLocation: 'Cajamarca, Perú', harvestDate: '2026-06-10', available: true, stock: 150, rating: 4.8, reviewCount: 19, organic: true, featured: true },
  { id: 12, name: 'Jengibre Fresco', description: 'Jengibre orgánico de Junín. Rizomas frescos y aromáticos.', category: 'Especias', price: 9.00, unit: 'kg', priceTiers: [{ minQty: 1, maxQty: 10, price: 9.00, unit: 'kg' }, { minQty: 11, maxQty: 30, price: 7.50, unit: 'kg' }, { minQty: 31, maxQty: 60, price: 6.50, unit: 'kg' }, { minQty: 61, maxQty: 9999, price: 5.50, unit: 'kg' }], images: [], producerId: 2, producerName: 'María Quispe', producerLocation: 'Junín, Perú', harvestDate: '2026-06-05', available: true, stock: 250, rating: 4.5, reviewCount: 11, organic: true, featured: false }
];

@Injectable({ providedIn: 'root' })
export class ProductService {
  getProducts(): Observable<Product[]> {
    return of(MOCK_PRODUCTS).pipe(delay(400));
  }

  getFeaturedProducts(): Observable<Product[]> {
    return of(MOCK_PRODUCTS.filter(p => p.featured)).pipe(delay(300));
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(MOCK_PRODUCTS.find(p => p.id === id)).pipe(delay(300));
  }

  getProductsByProducer(producerId: number): Observable<Product[]> {
    return of(MOCK_PRODUCTS.filter(p => p.producerId === producerId)).pipe(delay(300));
  }

  searchProducts(query: string): Observable<Product[]> {
    const q = query.toLowerCase();
    return of(MOCK_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.producerLocation.toLowerCase().includes(q)
    )).pipe(delay(300));
  }

  getCategories(): string[] {
    return [...new Set(MOCK_PRODUCTS.map(p => p.category))];
  }

  getLocations(): string[] {
    return [...new Set(MOCK_PRODUCTS.map(p => p.producerLocation))];
  }

  filterProducts(filters: { category?: string; location?: string; minPrice?: number; maxPrice?: number; organic?: boolean; minRating?: number }): Observable<Product[]> {
    let filtered = [...MOCK_PRODUCTS];
    if (filters.category) filtered = filtered.filter(p => p.category === filters.category);
    if (filters.location) filtered = filtered.filter(p => p.producerLocation === filters.location);
    if (filters.minPrice !== undefined) filtered = filtered.filter(p => p.price >= filters.minPrice!);
    if (filters.maxPrice !== undefined) filtered = filtered.filter(p => p.price <= filters.maxPrice!);
    if (filters.organic) filtered = filtered.filter(p => p.organic);
    if (filters.minRating) filtered = filtered.filter(p => p.rating >= filters.minRating!);
    return of(filtered).pipe(delay(300));
  }
}
