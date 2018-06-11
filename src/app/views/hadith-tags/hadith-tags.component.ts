import {Component, OnInit} from '@angular/core';
import * as toastr from 'toastr';
import {AuthService} from '../../services/auth.service';
import * as $ from 'jquery';
import {HttpErrorResponse} from '@angular/common/http';
import {
  HadithTag,
  HadithTagApiService
} from '../../services/hadith-tag-api.service';

@Component({
  selector: 'app-hadith-tags',
  templateUrl: './hadith-tags.component.html',
  styleUrls: ['./hadith-tags.component.css']
})
export class HadithTagsComponent implements OnInit {
  hadithTags: HadithTag[];
  page = 0;
  pageSize = 10;
  pageCount = 1;

  constructor(private hadithTagApi: HadithTagApiService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.loadHadithTags();
  }

  onPageChanged(page: number) {
    this.page = page;
    this.loadHadithTags();
  }

  private loadHadithTags() {
    this.hadithTagApi.query({
      limit: this.pageSize,
      offset: (this.page - 1) * this.pageSize
    }).subscribe(pagedHadiths => {
      this.hadithTags = pagedHadiths.results;
      this.pageCount = Math.ceil(pagedHadiths.count / this.pageSize);
    });
  }

  /*showDeleteDialog(tag: HadithTag) {
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
    this.hadithTagApi.delete(this.tagToDelete.id).subscribe(() => {
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
  };*/

  userHasDeletePermission() {
    return this.authService.loggedInUserHasPermission('delete_hadithtag');
  }
}
