import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {
  HadithTag,
  HadithTagApiService
} from '../../services/hadith-tag-api.service';
import {
  faPlus,
  faMinus,
  faPencilAlt,
  faSave,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import * as toastr from 'toastr';
import * as moment from 'moment';
import {EntityEditingComponent} from '../EntityEditingComponent';

@Component({
  selector: 'app-hadith-tags',
  templateUrl: './hadith-tags.component.html',
  styleUrls: ['./hadith-tags.component.css']
})
export class HadithTagsComponent extends EntityEditingComponent<HadithTag>
  implements OnInit {
  hadithTags: HadithTag[];
  page = 0;
  pageSize = 10;
  pageCount = 1;
  // Icons
  faPlus = faPlus;
  faMinus = faMinus;
  faPencilAlt = faPencilAlt;
  faSave = faSave;
  faTimes = faTimes;

  constructor(private hadithTagApi: HadithTagApiService,
              authService: AuthService) {
    super(hadithTagApi, HadithTag, authService, 'hadithtag');
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
      offset: (this.page - 1) * this.pageSize,
      ordering: '-updated_on'
    }).subscribe(pagedHadiths => {
      this.hadithTags = pagedHadiths.results;
      this.pageCount = Math.ceil(pagedHadiths.count / this.pageSize);
    });
  }

  /**
   * Ensures that the changes made to the entity are valid.
   * @param {HadithTag} tag The entity to be validated.
   * @returns {boolean} True or false.
   */
  validateEdits(tag: HadithTag): boolean {
    if (!tag.name) {
      toastr.error('Tag cannot be empty!');
      return false;
    }
    return true;
  }

  addNew(): HadithTag {
    const newTag = super.addNew();
    this.hadithTags.unshift(newTag);
    return newTag;
  }

  /**
   * Cancels editing of an entity and restore value.
   * @param {number} index The index of the entity to cancel editing.
   */
  cancelEditingByIndex(index: number) {
    const tag = this.hadithTags[index];

    if (tag._isAddingNew) {
      this.hadithTags.splice(index, 1);
    } else {
      super.cancelEditing(tag);
    }
  }

  formatTime(utcTime: string) {
    return moment(utcTime).local();
  }
}
