import {Component, OnInit} from '@angular/core';
import {faSync} from '@fortawesome/free-solid-svg-icons';
import {HadithHouseApiService, Hadith} from '../hadith-house-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faSync = faSync;

  constructor(private hadithHouseApi: HadithHouseApiService) {
  }

  public randomHadith: Hadith;

  // tslint:disable-next-line:no-empty
  ngOnInit() {
    this.loadRandomHadith();
  }

  loadRandomHadith() {
    this.hadithHouseApi.getRandomHadith().subscribe(hadith => {
      this.randomHadith = hadith;
    });
  }
}
