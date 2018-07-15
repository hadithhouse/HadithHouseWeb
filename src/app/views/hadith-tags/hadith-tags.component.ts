import {Component, Injector, OnInit, Type} from '@angular/core';
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
import {HttpErrorResponse} from '@angular/common/http';
import * as toastr from 'toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-hadith-tags',
  templateUrl: './hadith-tags.component.html',
  styleUrls: ['./hadith-tags.component.css']
})
export class HadithTagsComponent implements OnInit {
  hadithTags: HadithTag[];
  hadithTagsCopies: HadithTag[] = [];
  tagToDelete: HadithTag;
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

  addNew() {
    const newTag = new HadithTag();
    const newTagCopy = new HadithTag();
    newTag._isAddingNew = true;
    newTag._isEditing = true;
    this.hadithTags.unshift(newTag);
    this.hadithTagsCopies.unshift(newTagCopy);
  }

  /**
   * Starts editing an entity.
   * @param {number} index The index of the entity to edit.
   */
  startEditing(index: number) {
    const tag = this.hadithTags[index];
    const tagCopy = new HadithTag();
    tagCopy.set(tag);
    this.hadithTagsCopies[index] = tagCopy;
    tag._isEditing = true;
  }

  /**
   * Cancels editing of an entity and restore value.
   * @param {number} index The index of the entity to cancel editing.
   */
  cancelEditing(index: number) {
    const tag = this.hadithTags[index];

    if (tag._isAddingNew) {
      this.hadithTags.splice(index, 1);
      this.hadithTagsCopies.splice(index, 1);
    } else {
      const tagCopy = this.hadithTagsCopies[index];
      tag.set(tagCopy);
      tag._isEditing = false;
    }
  }

  /**
   * Called when the user clicks on the save button to save the entity.
   * @param {number} index The index of the entity to save.
   */
  finishEditing(index: number) {
    const tag = this.hadithTags[index];
    const tagCopy = this.hadithTagsCopies[index];
    if (!tag._isAddingNew && tag.equals(tagCopy)) {
      tag._isEditing = false;
      tag._isAddingNew = false;
      return;
    }
    if (!this.validateEdits(tag)) {
      return;
    }

    if (tag._isAddingNew) {
      this.addNewEntity(index);
    } else if (tag._isEditing) {
      this.updateExistingEntity(index);
    } else {
      throw new Error('Unreachable code.');
    }
  }

  /**
   * Called when the entity being saved is an existing entity.
   * @param {number} index The index of the entity to be updated.
   */
  private updateExistingEntity(index: number) {
    const tag = this.hadithTags[index];
    if (tag._isAddingNew) {
      throw new Error('This method cannot be called for adding new entities.');
    }

    // Send the changes to the server.
    this.hadithTagApi.put(tag).subscribe((hadithTag) => {
      this.hadithTags[index] = hadithTag;
      // Successfully saved changes. Don't need to do anything.
      tag._isEditing = false;
      tag._isAddingNew = false;
      toastr.success('Saved');
    }, (response: HttpErrorResponse) => {
      if (response.error.error) {
        toastr.error('Failed to add entity. Error was: ' +
          response.error.error);
      } else {
        toastr.error('Failed to save changes. Please try again.');
      }
    });
  }

  /**
   * Called when the entity being saved is a new entity.
   * @param {number} index The index of the entity to be saved.
   */
  private addNewEntity(index: number) {
    const tag = this.hadithTags[index];
    if (!tag._isAddingNew) {
      throw new Error(
        'This method cannot be called for updating existing entity.');
    }

    // Send the changes to the server.
    this.hadithTagApi.post(tag).subscribe((hadithTag) => {
      this.hadithTags[index] = hadithTag;
      // Successfully saved changes. Don't need to do anything.
      tag._isEditing = false;
      tag._isAddingNew = false;
      toastr.success('Saved');
    }, (response: HttpErrorResponse) => {
      if (response.error.error) {
        toastr.error('Failed to add entity. Error was: ' +
          response.error.error);
      } else {
        toastr.error('Failed to add entity. Please try again.');
      }
    });
  }

  /**
   * Called to display a dialog to confirm the request to delete an entity.
   * @param {number} index The index of the entity to be saved.
   * @param dialog
   */
  showDeleteDialog(index: number, dialog: any) {
    const tag = this.hadithTags[index];
    if (!this.authService.loggedInUserHasPermission('delete_hadithtag')) {
      throw new Error("The logged in user doesn't have permission to delete " +
        'hadith tags, so this method should not be called.');
    }
    this.tagToDelete = tag;
    dialog.show();
  }

  /**
   * Performs the actual deletion of the entity. This depends on an earlier call
   * to {@link showDeleteDialog}
   * @param dialog
   */
  deleteEntity(dialog: any) {
    dialog.hide();
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
  }

  formatTime(utcTime: string) {
    return moment(utcTime).local();
  }

  /**
   * Determines whether the user has the permission to add entities.
   * @returns {boolean} True or false.
   */
  userHasAddPermission(): boolean {
    return this.authService.loggedInUserHasPermission('add_hadithtag');
  }

  /**
   * Determines whether the user has the permission to edit entities.
   * @returns {boolean} True or false.
   */
  userHasEditPermission(): boolean {
    return this.authService.loggedInUserHasPermission('change_hadithtag');
  }

  /**
   * Determines whether the user has the permission to delete entities.
   * @returns {boolean} True or false.
   */
  userHasDeletePermission(): boolean {
    return this.authService.loggedInUserHasPermission('delete_hadithtag');
  }
}
