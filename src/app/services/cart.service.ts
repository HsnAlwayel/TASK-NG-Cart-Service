import { Injectable } from '@angular/core';
import { Product, CartItem } from '../../data/products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private products: CartItem[] = [];
  totalPrice: number = 0;
  constructor() {}

  addToCart(product: Product) {
    const existingProduct = this.products.find(
      (p) => p.product.id === product.id
    );
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.products.push({ product, quantity: 1 });
    }
    this.getCart();
    this.totalPrice = this.totalPrice + product.price;
  }

  getCart() {
    return this.products;
  }

  removeFromCart(product: Product) {
    this.products = this.products.filter((p) => p.product.id !== product.id);
    console.log(this.products);
    this.getCart();
  }

  incrementQuantity(product: Product) {
    const existingProduct = this.products.find(
      (p) => p.product.id === product.id
    );
    if (existingProduct) {
      if (existingProduct.quantity < existingProduct.product.stock) {
        existingProduct.quantity++;
        this.totalPrice = this.totalPrice + existingProduct.product.price;
      }
    }
    this.getTotalPrice();
  }

  decrementQuantity(product: Product) {
    const existingProduct = this.products.find(
      (p) => p.product.id === product.id
    );
    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        existingProduct.quantity--;
        this.totalPrice = this.totalPrice - existingProduct.product.price;
      } else {
        this.removeFromCart(product);
      }
    }
    this.getTotalPrice();
  }

  getTotalPrice() {
    this.totalPrice = this.products.reduce((acc, curr) => {
      return acc + curr.product.price * curr.quantity;
    }, 0);
    return this.totalPrice;
  }

  clearCart() {
    this.products = [];
    this.totalPrice = 0;
  }
}
