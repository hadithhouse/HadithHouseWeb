import {Component, OnInit} from '@angular/core';
import {HadithHouseApiService, HadithTag} from '../hadith-house-api.service';
import * as toastr from 'toastr';

@Component({
  selector: 'app-hadithtags',
  templateUrl: './hadithtags.component.html',
  styleUrls: ['./hadithtags.component.css']
})
export class HadithTagsComponent implements OnInit {
  hadithTags: HadithTag[];

  constructor(private hhApi: HadithHouseApiService) {
  }

  ngOnInit() {
    this.hhApi.getHadithTags({
      limit: 5,
      offset: 0
    }).subscribe(hadithTags => {
      this.hadithTags = hadithTags.results;
    });
  }

  showDeleteDialog(tag: HadithTag) {
    toastr.warning('Not implemented yet!');
  }

  userHasDeletePermission() {
    // FIXME: Not implemented yet.
    return true;
  }
}
