import { Component, OnInit } from '@angular/core';
import {LoadCssService} from '../../../load-css.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor(private loadService: LoadCssService) {
    loadService.loadCss('assets/css/mdb.min.css');
    loadService.loadScript('assets/js/mdb.min.js');
    loadService.loadScript('assets/js/main.js');
  }

  ngOnInit(): void {
  }

}
