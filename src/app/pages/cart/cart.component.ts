import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product, CartItem } from '../../../data/products';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductCardComponent, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  totalPrice: number = this.cartService.totalPrice;
  constructor(private cartService: CartService) {}
  cartItems: CartItem[] = this.cartService.getCart();

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
    this.cartItems = this.cartService.getCart();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  onRemoveFromCart() {
    this.cartItems = this.cartService.getCart();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  onIncrementQuantity() {
    this.cartItems = this.cartService.getCart();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = this.cartService.getCart();
    this.totalPrice = this.cartService.getTotalPrice();
  }
}
