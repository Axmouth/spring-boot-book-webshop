import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from '../../services/book.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: Book[];
  currentCategoryId: number;
  searchMode: boolean;

  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
    });
  }

  handleSearchBooks() {
    const keyword: string = this.activatedRoute.snapshot.paramMap.get('keyword');

    this.bookService
      .searchBooks(keyword)
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

  handleListBooks() {
    const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }

    this.bookService
      .getBooks(this.currentCategoryId)
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

  listBooks() {
    this.searchMode = this.activatedRoute.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      // Search based on book name
      this.handleSearchBooks();
    } else {
      // List books based on category
      this.handleListBooks();
    }
  }
}
