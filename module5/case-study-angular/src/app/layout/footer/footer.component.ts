import { Component, OnInit } from '@angular/core';
import {LoadCssService} from "../../service/load-css.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor( private loadService: LoadCssService,) {
    loadService.loadCss('assets/css/mdb.min.css');
    // loadService.loadCss('assets/css/bootstrap.min.css');
    // loadService.loadScript('assets/js/jquery-3.6.0.js');
    loadService.loadScript('assets/js/bootstrap.min.js');
    loadService.loadScript('assets/js/mdb.min.js');
  }

  ngOnInit(): void {
  }

}
