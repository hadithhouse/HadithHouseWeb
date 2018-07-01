import {Component, Input, OnInit} from '@angular/core';
import {Hadith, HadithApiService} from '../../services/hadith-api.service';

@Component({
  selector: 'hh-hadith',
  templateUrl: './hadith.component.html',
  styleUrls: ['./hadith.component.css']
})
export class HadithComponent implements OnInit {
  @Input('hadith-id') hadithId: number | 'random';
  hadith: Hadith;

  constructor(private hadithApi: HadithApiService) { }

  ngOnInit() {
    this.hadithApi.get(this.hadithId, {expand: true}).subscribe(hadith => {
      this.hadith = hadith;
    });
  }
}
