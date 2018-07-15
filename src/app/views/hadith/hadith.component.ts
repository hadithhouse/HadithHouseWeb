import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Hadith, HadithApiService} from '../../services/hadith-api.service';
import {
  faMinus,
  faPencilAlt,
  faSave,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-hadith',
  templateUrl: './hadith.component.html',
  styleUrls: ['./hadith.component.css']
})
export class HadithComponent implements OnInit {
  id: number = null;
  hadith: Hadith = null;
  isEditing = false;
  // Icons
  faMinus = faMinus;
  faPencilAlt = faPencilAlt;
  faSave = faSave;
  faTimes = faTimes;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private hadithApi: HadithApiService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.id = parseInt(paramMap.get('id'));
        if (isNaN(this.id)) {
          throw new Error('Invalid ID.');
        }
        this.loadHadith();
      } else {
        this.id = null;
      }
    });
  }

  private loadHadith() {
    this.hadithApi.get(this.id).subscribe(hadith => {
      this.hadith = hadith;
    });
  }

  startEditing() {
    this.isEditing = true;
  }

  finishEditing() {
    this.isEditing = false;
  }

  cancelEditing() {
    this.isEditing = false;
  }

  showDeleteDialog(dialog: any) {
    if (!this.authService.loggedInUserHasPermission('delete_hadith')) {
      throw new Error("The logged in user doesn't have permission to delete " +
        'hadith, so this method should not be called.');
    }
    dialog.show();
  }

  deleteHadith() {
    throw new Error('Not implemented yet');
  }

  /**
   * Determines whether the user has the permission to edit entities.
   * @returns {boolean} True or false.
   */
  userHasEditPermission(): boolean {
    return this.authService.loggedInUserHasPermission('change_hadith');
  }

  /**
   * Determines whether the user has the permission to delete entities.
   * @returns {boolean} True or false.
   */
  userHasDeletePermission(): boolean {
    return this.authService.loggedInUserHasPermission('delete_hadith');
  }
}
