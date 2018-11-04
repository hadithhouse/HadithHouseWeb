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
import {EntityEditingComponent} from '../EntityEditingComponent';

@Component({
  selector: 'app-hadith',
  templateUrl: './hadith.component.html',
  styleUrls: ['./hadith.component.css']
})
export class HadithComponent extends EntityEditingComponent<Hadith>
  implements OnInit {
  id: number = null;
  hadith: Hadith = null;
  // Icons
  faMinus = faMinus;
  faPencilAlt = faPencilAlt;
  faSave = faSave;
  faTimes = faTimes;

  constructor(private route: ActivatedRoute,
              private hadithApi: HadithApiService,
              authService: AuthService) {
    super(hadithApi, Hadith, authService, 'hadith');
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

  onTagDeleted(ids: number[]) {
    this.hadith.tags = ids;
  }

  validateEdits(entity: Hadith): boolean {
    // TODO: Add validation.
    return true;
  }
}
