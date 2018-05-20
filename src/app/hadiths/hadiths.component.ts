import {Component, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {Hadith, HadithHouseApiService} from '../hadith-house-api.service';

@Component({
  selector: 'app-hadiths',
  templateUrl: './hadiths.component.html',
  styleUrls: ['./hadiths.component.css']
})
export class HadithsComponent implements OnInit {
  hadiths: Hadith[];
  pageSize = 10;
  pageCount = 1;

  // tslint:disable-next-line:no-empty
  constructor(private hhApi: HadithHouseApiService) {
  }

  // tslint:disable-next-line:no-empty
  ngOnInit() {
    this.hhApi.getHadiths({
      limit: this.pageSize,
      offset: 0
    }).subscribe(pagedHadiths => {
      this.hadiths = pagedHadiths.results;
      this.pageCount = Math.ceil(pagedHadiths.count / this.pageSize);
    });
  }

  onPageChanged(page: number) {
    this.hhApi.getHadiths({
      limit: this.pageSize,
      offset: (page - 1) * this.pageSize
    }).subscribe(pagedHadiths => {
      this.hadiths = pagedHadiths.results;
      this.pageCount = Math.ceil(pagedHadiths.count / this.pageSize);
    });
  }
}
