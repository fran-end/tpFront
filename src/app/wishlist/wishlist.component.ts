import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../services/wishlist.service';
import { IProducts } from '../models/products';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: IProducts[] = [];

  constructor(private wishlistService: WishlistService) {}

  
  ngOnInit(): void {
    this.wishlist = this.wishlistService.getWishlist();
    console.log('Productos en lista deseados:', this.wishlist);
  }

  removeFromWishlist(id: number): void {
  this.wishlistService.removeFromWishlist(id);
  this.wishlist = this.wishlistService.getWishlist();

  Swal.fire({
    toast: true,
    position: 'bottom-end',
    icon: 'error',
    title: 'Producto eliminado de deseados',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });
}

}
