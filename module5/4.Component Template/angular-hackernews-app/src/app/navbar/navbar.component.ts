import { Component, OnInit } from '@angular/core';
import {LoadCssService} from '../../assets/load-css.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loadService: LoadCssService) {
    loadService.loadCss('assets/css/mdb.min.css');
    loadService.loadCss('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
    loadService.loadCss('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css');
    // loadService.loadCss('https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.6.0/mdb.min.css');

    loadService.loadScript('assets/js/mdb.min.js');
  }

  ngOnInit(): void {
  }

}
