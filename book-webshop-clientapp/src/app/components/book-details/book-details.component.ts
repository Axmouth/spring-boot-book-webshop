import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/common/book';
import { BookService } from '../../services/book.service';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  book: Book = new Book();

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.getBookInfo();
    });
  }

  getBookInfo() {
    const bookId = +this.activatedRoute.snapshot.paramMap.get('bookId');
    this.bookService.getBook(bookId).subscribe((data) => {
      this.book = data;
      this.book.unitPrice = this.book.unitPrice / 100;
    });
  }

  addToCart() {
    console.log(`book name: ${this.book.name}, and price ${this.book.unitPrice}`);
    const cartItem = new CartItem(this.book);
    this.cartService.addToCart(cartItem);
  }
}
