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

  getBooks(categoryId: number): Observable<Book[]> {
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${categoryId}`;
    return this.getBooksList(searchUrl);
  }

  private getBooksList(searchUrl: string): Observable<Book[]> {
    return this.http.get<GetResponseBooks>(searchUrl).pipe(map((response) => response._embedded.books));
  }

  getCategories(): Observable<BookCategory[]> {
    return this.http
      .get<GetResponseBookCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.bookCategory));
  }

  searchBooks(keyword: string): Observable<Book[]> {
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}`;
    return this.getBooksList(searchUrl);
  }
}

interface GetResponseBooks {
  _embedded: {
    books: Book[];
  };
}

interface GetResponseBookCategory {
  _embedded: {
    bookCategory: BookCategory[];
  };
}
