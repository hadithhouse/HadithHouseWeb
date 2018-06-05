import {Component, OnInit} from '@angular/core';
import {
  HadithHouseApiService,
  HadithTag,
  HadithTagService
} from '../hadith-house-api.service';
import * as toastr from 'toastr';
import {AuthService} from '../auth.service';
import * as $ from 'jquery';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-hadithtags',
  templateUrl: './hadithtags.component.html',
  styleUrls: ['./hadithtags.component.css']
})
export class HadithTagsComponent implements OnInit {
  hadithTags: HadithTag[];
  private tagToDelete: HadithTag = null;

  constructor(private hhApi: HadithHouseApiService,
              private hadithTagService: HadithTagService,
              private authService: AuthService) {
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
    if (!this.authService.loggedInUserHasPermission('delete_hadithtag')) {
      throw new Error("The logged in user doesn't have permission to delete " +
        'hadith tags, so this method should not be called.');
    }
    this.tagToDelete = tag;
    (<any>$('#deleteConfirmDialog')).modal('show');
  }

  public deleteEntity = () => {
    // modal() is defined in bootstrap but I don't have @types for it so costing
    // to type 'any' to stop tsc compiler errors.
    (<any>$('#deleteConfirmDialog')).modal('hide');
    this.hadithTagService.delete(this.tagToDelete.id).subscribe(() => {
      toastr.success('Hadith tag deleted');
      this.hadithTags = this.hadithTags.filter((e) => {
        return e.id !== this.tagToDelete.id;
      });
      this.tagToDelete = null;
    }, (result: HttpErrorResponse) => {
      if (result.error.error) {
        toastr.error('Failed to delete entity. Error was: ' +
          `${result.error.error}`);
      } else {
        toastr.error('Failed to delete entity. Please try again!');
      }
    });
  };

  userHasDeletePermission() {
    return this.authService.loggedInUserHasPermission('delete_hadithtag');
  }
}
