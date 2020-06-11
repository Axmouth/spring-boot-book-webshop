import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  totalQuantity = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartDetails();
  }

  cartDetails() {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe((data) => (this.totalQuantity = data));
    this.cartService.calculateTotalPrice();
  }

  incrementQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
  }

  remove(cartItem: CartItem) {
    this.cartService.remove(cartItem);
  }
}
