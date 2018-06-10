import {Component, OnInit} from '@angular/core';
import * as toastr from 'toastr';
import {Book, BookApiService} from '../../services/book-api.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[];

  // tslint:disable-next-line:no-empty
  constructor(private bookApi: BookApiService) {
  }

  // tslint:disable-next-line:no-empty
  ngOnInit() {
    this.bookApi.query({
      limit: 5,
      offset: 0
    }).subscribe(pagedBooks => {
      this.books = pagedBooks.results;
    });
  }

  showDeleteDialog(book: Book) {
    toastr.warning('Not implemented yet!');
  }

  userHasDeletePermission() {
    // FIXME: Not implemented yet.
    return true;
  }
}
