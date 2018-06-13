import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange
} from '@angular/core';

@Component({
  selector: 'hh-page-nav',
  templateUrl: './page-nav.component.html',
  styleUrls: ['./page-nav.component.css']
})
export class PageNavComponent implements OnInit, OnChanges {
  @Input('count') pageCount: number;
  @Output('change') pageChanged = new EventEmitter<number>();
  page = 1;

  // tslint:disable-next-line:no-empty
  constructor() {
  }

  // tslint:disable-next-line:no-empty
  ngOnInit() {
  }

  pageRange(): number[] {
    const range: number[] = [];
    let start = this.page - 2;
    let end = this.page + 2;
    if (start < 1) {
      end += (1 - start);
      start = 1;
    }
    if (end > this.pageCount) {
      start -= (end - this.pageCount);
      end = this.pageCount;
      if (start < 1) {
        start = 1;
      }
    }
    for (let i = start; i <= end; i += 1) {
      range.push(i);
    }
    return range;
  }

  setPage(page: number) {
    this.page = page;
    if (this.page < 1) {
      this.page = 1;
    }
    if (this.page > this.pageCount) {
      this.page = this.pageCount;
    }
    this.pageChanged.emit(this.page);
  }

  // tslint:disable-next-line:no-empty
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
  }

}
