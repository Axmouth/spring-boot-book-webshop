import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/common/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  book: Book = new Book();

  constructor(private activatedRoute: ActivatedRoute, private bookService: BookService) {}

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
}
