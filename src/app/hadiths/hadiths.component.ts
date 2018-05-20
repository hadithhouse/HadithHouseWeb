import { Component, OnInit } from '@angular/core';
import {Hadith, HadithHouseApiService} from '../hadith-house-api.service';

@Component({
  selector: 'app-hadiths',
  templateUrl: './hadiths.component.html',
  styleUrls: ['./hadiths.component.css']
})
export class HadithsComponent implements OnInit {
  hadiths: Hadith[];
  // tslint:disable-next-line:no-empty
  constructor(private hhApi: HadithHouseApiService) { }

  // tslint:disable-next-line:no-empty
  ngOnInit() {
    this.hhApi.getHadiths({
      limit: 5,
      offset: 0
    }).subscribe(pagedHadiths => {
      this.hadiths = pagedHadiths.results;
    });
  }
}
