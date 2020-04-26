import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from '../../services/book.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: Book[];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.listBooks();
  }

  listBooks() {
    this.bookService
      .getBooks()
      .pipe(
        map((data) => {
          const books = [];
          for (const book of data) {
            const newBook = book;
            newBook.unitPrice = book.unitPrice / 100;
            books.push(newBook);
          }
          return books;
        }),
      )
      .subscribe((books) => {
        this.books = books;
      });
  }
}
