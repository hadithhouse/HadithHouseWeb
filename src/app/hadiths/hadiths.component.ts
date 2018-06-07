import {Component, OnInit} from '@angular/core';
import {Hadith, HadithApiService} from '../services/hadith-api.service';

@Component({
  selector: 'app-hadiths',
  templateUrl: './hadiths.component.html',
  styleUrls: ['./hadiths.component.css']
})
export class HadithsComponent implements OnInit {
  hadiths: Hadith[];
  page = 0;
  pageSize = 10;
  pageCount = 1;

  // tslint:disable-next-line:no-empty
  constructor(private hadithApi: HadithApiService) {
  }

  // tslint:disable-next-line:no-empty
  ngOnInit() {
    this.loadHadiths();
  }

  onPageChanged(page: number) {
    this.page = page;
    this.loadHadiths();
  }

  private loadHadiths() {
    this.hadithApi.query({
      limit: this.pageSize,
      offset: (this.page - 1) * this.pageSize
    }).subscribe(pagedHadiths => {
      this.hadiths = pagedHadiths.results;
      this.pageCount = Math.ceil(pagedHadiths.count / this.pageSize);
    });
  }
}
