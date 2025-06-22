import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducts, IProductResponse } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) { }

  // Obtener productos con paginación
  public getAllProducts(limit: number = 30, skip: number = 0): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${this.url}?limit=${limit}&skip=${skip}`);
  }

  public getProductById(id: number | string): Observable<IProducts> {
    return this.http.get<IProducts>(`${this.url}/${id}`);
  }

  public searchProducts(query: string): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${this.url}/search?q=${query}`);
  }
}