import {Component, Input, OnInit} from '@angular/core';
import {Hadith, HadithApiService} from '../../services/hadith-api.service';
import {faExpand} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'hh-hadith',
  templateUrl: './hadith.component.html',
  styleUrls: ['./hadith.component.css']
})
export class HadithComponent implements OnInit {
  @Input('hadith-id') hadithId: number | 'random' = null;
  @Input('hadith') hadith: Hadith = null;
  faExpand = faExpand;

  constructor(private hadithApi: HadithApiService) {
  }

  ngOnInit() {
    if (!this.hadith && !this.hadithId) {
      throw new Error("Either 'hadith' or 'hadith-id' should be set " +
        'for <hh-hadith>.');
    }
    if (!this.hadith) {
      this.hadithApi.get(this.hadithId, {expand: true}).subscribe(hadith => {
        this.hadith = hadith;
      });
    }
  }
}
