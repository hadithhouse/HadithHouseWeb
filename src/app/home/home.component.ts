import {Component, OnInit} from '@angular/core';
import {faSync} from '@fortawesome/free-solid-svg-icons';
import {Hadith, HadithApiService} from '../services/hadith-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faSync = faSync;

  constructor(private hadithApi: HadithApiService) {
  }

  public randomHadith: Hadith;

  // tslint:disable-next-line:no-empty
  ngOnInit() {
    this.loadRandomHadith();
  }

  loadRandomHadith() {
    this.hadithApi.get('random').subscribe(hadith => {
      this.randomHadith = hadith;
    });
  }
}
