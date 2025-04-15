import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../data/products';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() quantity?: number = 1;
  @Input() isInCart?: boolean = false;
  @Output() removeFromCartEvent = new EventEmitter();
  @Output() incrementQuantityEvent = new EventEmitter();

  constructor(private cartService: CartService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  incrementQuantity() {
    this.cartService.incrementQuantity(this.product);
    this.incrementQuantityEvent.emit();
  }

  decrementQuantity() {
    this.cartService.decrementQuantity(this.product);
    this.removeFromCartEvent.emit();
    this.cartService.getTotalPrice();
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
    this.removeFromCartEvent.emit();
  }
}
