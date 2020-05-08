import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../common/book';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  baseUrl = 'http://localhost:8292/api/v1/books';

  categoryUrl = 'http://localhost:8292/api/v1/book-category';

  constructor(private http: HttpClient) {}

  getBooks(categoryId: number, currentPage = 0, pageSize = 0): Observable<GetResponseBooks> {
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${categoryId}&size=${pageSize}&page=${currentPage}`;
    return this.getBooksList(searchUrl);
  }

  private getBooksList(searchUrl: string): Observable<GetResponseBooks> {
    return this.http.get<GetResponseBooks>(searchUrl);
  }

  getCategories(currentPage = 0, pageSize = 0): Observable<BookCategory[]> {
    return this.http
      .get<GetResponseBookCategory>(`${this.categoryUrl}?size=${pageSize}&page=${currentPage}`)
      .pipe(map((response) => response._embedded.bookCategory));
  }

  searchBooks(keyword: string, currentPage = 0, pageSize = 0): Observable<GetResponseBooks> {
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}&size=${pageSize}&page=${currentPage}`;
    return this.getBooksList(searchUrl);
  }

  getBook(bookId: number): Observable<Book> {
    const bookDetailsUrl = `${this.baseUrl}/${bookId}`;

    return this.http.get<Book>(bookDetailsUrl);
  }
}

export interface GetResponseBooks {
  _embedded: {
    books: Book[];
  };
  page: {
    // records in each page
    size: number;
    // total number of records in database
    totalElements: number;
    // total number of pages available(starts at 0)
    totalPages: number;
    // number of current page(starts at 0)
    number: number;
  };
}

export interface GetResponseBookCategory {
  _embedded: {
    bookCategory: BookCategory[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
