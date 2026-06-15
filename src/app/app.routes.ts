import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./pages/auth/login/login').then(m => m.LoginComponent) },
  { path: 'registro-agricultor', loadComponent: () => import('./pages/auth/register-farmer/register-farmer').then(m => m.RegisterFarmerComponent) },
  { path: 'registro-comprador', loadComponent: () => import('./pages/auth/register-buyer/register-buyer').then(m => m.RegisterBuyerComponent) },
  { path: 'marketplace', loadComponent: () => import('./pages/marketplace/marketplace').then(m => m.MarketplaceComponent) },
  { path: 'producto/:id', loadComponent: () => import('./pages/marketplace/product-detail/product-detail').then(m => m.ProductDetailComponent) },
  { path: 'productor/:id', loadComponent: () => import('./pages/productor/profile/profile').then(m => m.ProducerProfileComponent) },
  { path: 'carrito', loadComponent: () => import('./pages/pedidos/cart/cart').then(m => m.CartComponent), canActivate: [authGuard] },
  { path: 'pedidos', loadComponent: () => import('./pages/pedidos/orders-list/orders-list').then(m => m.OrdersListComponent), canActivate: [authGuard] },
  { path: 'pedido/:id', loadComponent: () => import('./pages/pedidos/tracking/tracking').then(m => m.TrackingComponent), canActivate: [authGuard] },
  { path: 'perfil', loadComponent: () => import('./pages/auth/user-profile/user-profile').then(m => m.UserProfileComponent), canActivate: [authGuard] },
  { path: 'dashboard', loadComponent: () => import('./pages/analytics/dashboard-farmer/dashboard-farmer').then(m => m.DashboardFarmerComponent), canActivate: [authGuard] },
  { path: 'admin', loadComponent: () => import('./pages/admin/dashboard/dashboard').then(m => m.AdminDashboardComponent), canActivate: [adminGuard] },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFoundComponent) }
];
