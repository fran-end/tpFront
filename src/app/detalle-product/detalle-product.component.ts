import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { IProducts } from '../models/products';
import { ApiService } from '../services/api.service';
import { ProductsComponent } from '../products/products.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalle-product',
  standalone: true,
  imports: [CommonModule, ProductsComponent, FormsModule, RouterModule],
  templateUrl: './detalle-product.component.html',
  styleUrls: ['./detalle-product.component.css']
})
export class DetalleProductComponent implements OnInit {
  product?: IProducts;


  products: IProducts[] = [];
  filteredProducts: IProducts[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  loadingMore: boolean = false;
  error: string = '';


  currentSkip: number = 0;
  productsPerPage: number = 30;
  totalProducts: number = 0;
  isSearching: boolean = false;
  private searchTimeout: any;

  private _route = inject(ActivatedRoute);
  private _apiService = inject(ApiService);

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this._route.params.subscribe({
      next: (params) => {
        const id = params['id'];
        this._apiService.getProductById(id).subscribe({
          next: (data) => {
            this.product = data;
          },
          error: (err) => {
            console.error('Error al cargar el producto:', err);
          }
        });
      }
    });
  }

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

  clearSearch(): void {
    this.searchTerm = '';
    this.isSearching = false;
    this.filteredProducts = this.products;
    
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }
}