import { Component } from '@angular/core';
import { ProductsComponent } from './products/products.component';
import { RouterModule } from '@angular/router';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ProductsComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tu-app';
}