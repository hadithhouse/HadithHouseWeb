import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-hadith',
  templateUrl: './hadith.component.html',
  styleUrls: ['./hadith.component.css']
})
export class HadithComponent implements OnInit {
  id: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
  }
}
