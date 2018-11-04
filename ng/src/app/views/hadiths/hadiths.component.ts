import {Component, OnInit} from '@angular/core';
import {Hadith, HadithApiService} from '../../services/hadith-api.service';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-hadiths',
  templateUrl: './hadiths.component.html',
  styleUrls: ['./hadiths.component.css']
})
export class HadithsComponent implements OnInit {
  hadithsObs: Observable<Hadith[]>;
  page = 0;
  pageSize = 10;
  pageCount = 1;

  constructor(private hadithApi: HadithApiService) {
  }

  ngOnInit() {
    this.loadHadiths();
  }

  onPageChanged(page: number) {
    this.page = page;
    this.loadHadiths();
  }

  private loadHadiths() {
    const pagedResultsObsv = this.hadithApi.query({
      limit: this.pageSize,
      offset: (this.page - 1) * this.pageSize,
      ordering: '-updated_on',
      expand: true
    });
    this.hadithsObs = pagedResultsObsv.pipe(map(r => r.results));
    pagedResultsObsv.subscribe(pagedHadiths => {
      this.pageCount = Math.ceil(pagedHadiths.count / this.pageSize);
    });
  }
}
