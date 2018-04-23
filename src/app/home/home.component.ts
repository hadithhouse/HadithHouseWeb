import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {faSync} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../environments/environment';

class Entity {
  public id: number;
  // tslint:disable-next-line:variable-name
  public added_by: number;
  // tslint:disable-next-line:variable-name
  public updated_by: number;
  // tslint:disable-next-line:variable-name
  public added_on: string;
  // tslint:disable-next-line:variable-name
  public updated_on: string;
  public valid: boolean = null;
}

class Hadith extends Entity {
  public text: string;
  public person: number;
  public book: number;
  public volume: number;
  public chapter: number;
  public section: number;
  public tags: number[];

}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faSync = faSync;

  constructor(private httpClient: HttpClient) {
  }

  public randomHadith: Hadith;

  // tslint:disable-next-line:no-empty
  ngOnInit() {
    this.loadRandomHadith();
  }

  loadRandomHadith() {
    alert('test');
    // const url = 'http://api-dev.hadithhouse.net/apis/hadiths/random';
    const url = environment.apisUrl + 'hadiths/random';

    this.httpClient.get<Hadith>(url, {
      headers: {}
    }).subscribe(hadith => {
      this.randomHadith = hadith;
    });
  }
}
