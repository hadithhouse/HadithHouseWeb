import {Component, OnInit} from '@angular/core';
import {Book, HadithHouseApiService} from '../hadith-house-api.service';
import * as toastr from 'toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[];

  // tslint:disable-next-line:no-empty
  constructor(private hhApi: HadithHouseApiService) {
  }

  // tslint:disable-next-line:no-empty
  ngOnInit() {
    this.hhApi.getBooks({
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
