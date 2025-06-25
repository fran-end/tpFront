import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { IProducts } from '../models/products';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../services/wishlist.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule]
})

export class ProductsComponent implements OnInit, OnDestroy {
  products: IProducts[] = [];
  filteredProducts: IProducts[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  loadingMore: boolean = false;
  error: string = '';
  
  // Paginación
  currentSkip: number = 0;
  productsPerPage: number = 30;
  totalProducts: number = 0;
  isSearching: boolean = false;
  private searchTimeout: any;

  constructor(private apiService: ApiService, private wishlistService: WishlistService) {}


  ngOnInit(): void {
    this.loadProducts();
  }

 addToWishlist(product: IProducts): void {
  this.wishlistService.addToWishlist(product);

  // Toast que no bloquea la pantalla
  Swal.fire({
    toast: true,
    position: 'bottom-end',
    icon: 'success',
    title: `"${product.title}" agregado a deseados`,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });
}


  loadProducts(): void {
    this.loading = true;
    this.error = '';
    this.currentSkip = 0;
    this.isSearching = false;
    
    this.apiService.getAllProducts(this.productsPerPage, 0).subscribe({
      next: (response) => {
        this.products = response.products;
        this.filteredProducts = response.products;
        this.totalProducts = response.total;
        this.currentSkip = this.productsPerPage;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los productos';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  // Búsqueda en tiempo real
  onSearchInput(): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.performSearch();
    }, 300);
  }

  // Búsqueda tradicional (Enter)
  onSearch(): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.performSearch();
  }

  // Realizar la búsqueda
  private performSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.isSearching = false;
      this.filteredProducts = this.products;
      return;
    }

    this.loading = true;
    this.isSearching = true;
    
    this.apiService.searchProducts(this.searchTerm).subscribe({
      next: (response) => {
        this.filteredProducts = response.products;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error en la búsqueda';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  // Cargar más productos desde la API
  loadMoreProducts(): void {
    if (!this.canLoadMore() || this.loadingMore) return;
    
    this.loadingMore = true;
    
    this.apiService.getAllProducts(this.productsPerPage, this.currentSkip).subscribe({
      next: (response) => {
        // Agregar nuevos productos a la lista existente
        this.products = [...this.products, ...response.products];
        this.filteredProducts = [...this.filteredProducts, ...response.products];
        this.currentSkip += this.productsPerPage;
        this.loadingMore = false;
      },
      error: (err) => {
        this.error = 'Error al cargar más productos';
        this.loadingMore = false;
        console.error('Error:', err);
      }
    });
  }

  // Verificar si se pueden cargar más productos
  canLoadMore(): boolean {
    // Si está buscando, no mostrar botón cargar más
    if (this.isSearching) return false;
    
    // Verificar si hay más productos disponibles en la API
    return this.products.length < this.totalProducts;
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.isSearching = false;
    this.filteredProducts = this.products;
    
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }

  formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  ngOnDestroy(): void {}
}