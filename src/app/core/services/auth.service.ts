import { Injectable, signal, computed } from '@angular/core';
import { Observable, of, delay, tap } from 'rxjs';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'productor' | 'comprador' | 'admin';
  avatar: string;
  phone?: string;
  location?: string;
  company?: string;
  buyerType?: string;
  status?: 'activo' | 'pendiente' | 'suspendido';
}

export interface AuthResponse {
  success: boolean;
  data: User | null;
  message: string;
}

const MOCK_USERS: User[] = [
  {
    id: 1,
    email: 'juan@agro.com',
    password: '123456',
    name: 'Juan Huamán',
    role: 'productor',
    avatar: '',
    phone: '+51 987 654 321',
    location: 'Cusco, Perú',
    status: 'activo'
  },
  {
    id: 2,
    email: 'maria@agro.com',
    password: '123456',
    name: 'María Quispe',
    role: 'productor',
    avatar: '',
    phone: '+51 976 543 210',
    location: 'Junín, Perú',
    status: 'activo'
  },
  {
    id: 3,
    email: 'comprador@empresa.com',
    password: '123456',
    name: 'Roberto Gómez',
    role: 'comprador',
    avatar: '',
    phone: '+51 965 432 109',
    company: 'Alimentos del Sur S.A.C.',
    buyerType: 'Mayorista',
    status: 'activo'
  },
  {
    id: 4,
    email: 'admin@agromarket.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin',
    avatar: '',
    status: 'activo'
  },
  {
    id: 5,
    email: 'carlos@agro.com',
    password: '123456',
    name: 'Carlos Mendoza',
    role: 'productor',
    avatar: '',
    phone: '+51 954 321 098',
    location: 'Arequipa, Perú',
    status: 'pendiente'
  },
  {
    id: 6,
    email: 'ana@agro.com',
    password: '123456',
    name: 'Ana Torres',
    role: 'productor',
    avatar: '',
    phone: '+51 943 210 987',
    location: 'Cajamarca, Perú',
    status: 'pendiente'
  }
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSignal = signal<User | null>(null);
  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isLoggedIn = computed(() => !!this.currentUserSignal());
  readonly isAdmin = computed(() => this.currentUserSignal()?.role === 'admin');
  readonly isProductor = computed(() => this.currentUserSignal()?.role === 'productor');
  readonly isComprador = computed(() => this.currentUserSignal()?.role === 'comprador');

  constructor() {
    const saved = localStorage.getItem('agromarket_user');
    if (saved) {
      try {
        this.currentUserSignal.set(JSON.parse(saved));
      } catch {}
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (user) {
      return of({ success: true, data: user, message: 'Inicio de sesión exitoso' }).pipe(
        delay(500),
        tap(res => {
          if (res.data) {
            this.currentUserSignal.set(res.data);
            localStorage.setItem('agromarket_user', JSON.stringify(res.data));
          }
        })
      );
    }
    return of({ success: false, data: null, message: 'Correo o contraseña incorrectos' }).pipe(delay(500));
  }

  registerFarmer(data: Partial<User>): Observable<AuthResponse> {
    const newUser: User = {
      id: MOCK_USERS.length + 1,
      email: data.email || '',
      password: data.password || '',
      name: data.name || '',
      role: 'productor',
      avatar: '',
      phone: data.phone,
      location: data.location,
      status: 'pendiente'
    };
    return of({ success: true, data: newUser, message: 'Registro exitoso. Su cuenta está pendiente de aprobación.' }).pipe(delay(800));
  }

  registerBuyer(data: Partial<User>): Observable<AuthResponse> {
    const newUser: User = {
      id: MOCK_USERS.length + 1,
      email: data.email || '',
      password: data.password || '',
      name: data.name || '',
      role: 'comprador',
      avatar: '',
      phone: data.phone,
      company: data.company,
      buyerType: data.buyerType,
      status: 'activo'
    };
    return of({ success: true, data: newUser, message: 'Registro exitoso.' }).pipe(
      delay(800),
      tap(res => {
        if (res.data) {
          this.currentUserSignal.set(res.data);
          localStorage.setItem('agromarket_user', JSON.stringify(res.data));
        }
      })
    );
  }

  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem('agromarket_user');
  }

  getAllUsers(): Observable<User[]> {
    return of(MOCK_USERS).pipe(delay(300));
  }

  getPendingUsers(): Observable<User[]> {
    return of(MOCK_USERS.filter(u => u.status === 'pendiente')).pipe(delay(300));
  }
}
