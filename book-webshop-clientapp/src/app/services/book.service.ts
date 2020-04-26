import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../common/book';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  apiUrl = 'http://localhost:8292/api/v1/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<GetResponseBooks>(this.apiUrl).pipe(map((response) => response._embedded.books));
  }
}

interface GetResponseBooks {
  _embedded: {
    books: Book[];
  };
}
