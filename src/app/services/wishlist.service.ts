import { Injectable } from '@angular/core';
import { IProducts } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: IProducts[] = [];

  getWishlist(): IProducts[] {
    return this.wishlist;
  }

  addToWishlist(product: IProducts): void {
    const exists = this.wishlist.find(p => p.id === product.id);
    if (!exists) {
      this.wishlist.push(product);
    }
  }

  removeFromWishlist(id: number): void {
    this.wishlist = this.wishlist.filter(p => p.id !== id);
  }
}
