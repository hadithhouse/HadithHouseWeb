import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-hadith',
  templateUrl: './hadith.component.html',
  styleUrls: ['./hadith.component.css']
})
export class HadithComponent implements OnInit {
  id: number = null;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.id = parseInt(paramMap.get('id'));
        if (isNaN(this.id)) {
          throw new Error('Invalid ID.');
        }
      } else {
        this.id = null;
      }
    });
  }
}
