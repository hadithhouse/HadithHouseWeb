import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, SimpleChange
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

  constructor() {
  }

  ngOnInit() {
  }

  pageRange(): number[] {
    const range: number[] = [];
    const start = Math.max(this.page - 3, 0);
    const end = Math.min(start + 4, this.pageCount - 1);
    for (let i = start; i <= end; i += 1) {
      range.push(i + 1);
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

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {

  }
}
