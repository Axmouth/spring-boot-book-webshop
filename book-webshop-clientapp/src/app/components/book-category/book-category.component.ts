import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { BookCategory } from '../../common/book-category';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.scss'],
})
export class BookCategoryComponent implements OnInit {
  bookCategories: BookCategory[];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.listBookCategories();
  }

  listBookCategories() {
    this.bookService.getCategories().subscribe((data) => {
      this.bookCategories = data;
    });
  }
}
