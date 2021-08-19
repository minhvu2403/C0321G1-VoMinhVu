import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoadCssService} from "../../service/load-css.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loadService: LoadCssService,
              private router: Router) {
    loadService.loadCss('assets/css/mdb.min.css');
    // loadService.loadCss('assets/css/bootstrap.min.css');
    // loadService.loadScript('assets/js/jquery-3.6.0.js');
    loadService.loadScript('assets/js/bootstrap.min.js');
    loadService.loadScript('assets/js/mdb.min.js');
  }
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
