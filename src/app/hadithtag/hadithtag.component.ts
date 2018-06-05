import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit
} from '@angular/core';
import {Location} from '@angular/common';
import {
  HadithTag,
  HadithTagService
} from '../hadith-house-api.service';
import * as toastr from 'toastr';
import {AuthService} from '../auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import {faTimes, faPencilAlt, faSave} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-hadithtag',
  templateUrl: './hadithtag.component.html',
  styleUrls: ['./hadithtag.component.css']
})
export class HadithTagComponent implements OnInit {
  public hadithTag: HadithTag = null;
  private hadithTagCopy: HadithTag = new HadithTag();
  private error: string;
  private isAddingNew: boolean;
  private isEditing: boolean;

  faTimes = faTimes;
  faPencil = faPencilAlt;
  faSave = faSave;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private hadithTagService: HadithTagService,
              protected authService: AuthService,
              private changeDetector: ChangeDetectorRef,
              private ngZone: NgZone) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.hadithTagService.get(parseInt(id)).subscribe(hadithTag => {
        this.hadithTag = hadithTag;
        this.changeDetector.detectChanges();
      });
    } else {
      this.hadithTag = new HadithTag();
    }
  }

  /**
   * Makes a copy of the data of the hadith tag in case we have to restore them
   * if the user cancels editing or we fail to send changes to the server.
   */
  protected copyEntity() {
    this.hadithTagCopy.set(this.hadithTag);
  }

  /**
   * Restores the saved data of the hadith tag after the user cancels editing
   * or we fail to send changes to the server.
   */
  protected restoreEntity() {
    this.hadithTag.set(this.hadithTagCopy);
  }

  protected newEntity(): HadithTag {
    return new HadithTag();
  }

  // tslint:disable-next-line:no-empty
  protected onEntityLoaded() {
  }


  protected beforeSave(): boolean {
    return true;
  }

  // tslint:disable-next-line:no-empty
  protected afterSave() {
  }

  /**
   * Called when the user clicks on the edit icon to start editing the hadith
   * tag.
   */
  startEditing() {
    this.copyEntity();
    this.isEditing = true;
  }

  /**
   * Called when the user clicks on the save icon to save the changes made.
   */
  finishEditing = () => {
    if (this.hadithTag.equals(this.hadithTagCopy)) {
      this.isEditing = false;
      this.isAddingNew = false;
      return;
    }
    if (!this.beforeSave()) {
      // Before-save validation failed.
      return;
    }

    if (this.isAddingNew) {
      this.addNewEntity();
    } else {
      this.updateExistingEntity();
    }
  };

  private updateExistingEntity() {
    if (this.isAddingNew) {
      throw new Error('This method cannot be called for adding new entities.');
    }

    // Send the changes to the server.
    this.hadithTagService.put(this.hadithTag).subscribe((hadithTag) => {
      // TODO: Remove hard coding.
      this.location.go('hadithtag/' + hadithTag.id);
      this.hadithTag = hadithTag;
      // Successfully saved changes. Don't need to do anything.
      this.isEditing = false;
      this.isAddingNew = false;
      toastr.success('Saved');
    }, (response: HttpErrorResponse) => {
      if (response.error.data) {
        let message = 'Failed to save changes. Error was: ';
        message += '\n';
        _.each(response.error.data, (errors: string[], fieldName: string) => {
          message += fieldName;
          message += ': ';
          message += errors.join(', ');
          message += '\n';
        });
        toastr.error(message);
      } else {
        toastr.error('Failed to save changes. Please try again.');
      }
    });
  }

  private addNewEntity() {
    if (!this.isAddingNew) {
      throw new Error(
        'This method cannot be called for updating existing entity.');
    }

    // Send the changes to the server.
    this.hadithTagService.post(this.hadithTag).subscribe((hadithTag) => {
      this.hadithTag = hadithTag;
      // Successfully saved changes. Don't need to do anything.
      this.isEditing = false;
      this.isAddingNew = false;
      toastr.success('Saved');
    }, (response: HttpErrorResponse) => {
      if (response.error.data) {
        let message = 'Failed to add entity. Error was: ';
        message += '\n';
        _.each(response.error.data, (errors: string[], fieldName: string) => {
          message += fieldName;
          message += ': ';
          message += errors.join(', ');
          message += '\n';
        });
        toastr.error(message);
      } else {
        toastr.error('Failed to add entity. Please try again.');
      }
    });
  }

  /**
   * Called when the user clicks on the X icon to cancel the changes made.
   */
  cancelEditing() {
    if (this.isEditing) {
      this.isEditing = false;
      this.restoreEntity();
    }
  }
}
