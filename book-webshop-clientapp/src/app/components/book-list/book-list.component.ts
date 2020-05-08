import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService, GetResponseBooks } from '../../services/book.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  currentCategoryId: number;
  searchMode = false;
  previousCategoryId = 1;

  // pagination
  currentPage = 1;
  pageSize = 5;
  totalElements = 0;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private ngbPaginConfig: NgbPaginationConfig,
  ) {
    ngbPaginConfig.maxSize = 3;
    ngbPaginConfig.boundaryLinks = true;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
    });
  }

  handleSearchBooks() {
    const keyword: string = this.activatedRoute.snapshot.paramMap.get('keyword');

    this.bookService
      .searchBooks(keyword, this.currentPage - 1, this.pageSize)
      .pipe(
        map((data) => {
          const books = [];
          for (const book of data._embedded.books) {
            const newBook = book;
            newBook.unitPrice = book.unitPrice / 100;
            books.push(newBook);
          }
          data._embedded.books = books;
          return data;
        }),
      )
      .subscribe(this.processPaginate());
  }

  handleListBooks() {
    const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has('categoryId');

    if (hasCategoryId) {
      this.currentCategoryId = +this.activatedRoute.snapshot.paramMap.get('categoryId');
    } else {
      this.currentCategoryId = 1;
    }

    // setting the page number to 1 when changing category
    if (this.previousCategoryId !== this.currentCategoryId) {
      this.currentPage = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.bookService
      .getBooks(this.currentCategoryId, this.currentPage - 1, this.pageSize)
      .pipe(
        map((data) => {
          const books = [];
          for (const book of data._embedded.books) {
            const newBook = book;
            newBook.unitPrice = book.unitPrice / 100;
            books.push(newBook);
          }
          data._embedded.books = books;
          return data;
        }),
      )
      .subscribe(this.processPaginate());
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

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listBooks();
  }

  processPaginate() {
    return (data: GetResponseBooks) => {
      this.books = data._embedded.books;
      this.currentPage = data.page.number + 1;
      this.totalElements = data.page.totalElements;
      this.pageSize = data.page.size;
    };
  }
}
