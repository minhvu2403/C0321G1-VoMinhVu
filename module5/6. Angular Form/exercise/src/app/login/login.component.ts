import { Component, OnInit } from '@angular/core';
import {NgForm } from '@angular/forms';
import {LoadCssService} from '../../../load-css.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loadService: LoadCssService) {
    loadService.loadCss('assets/css/mdb.min.css');
    loadService.loadScript('assets/js/mdb.min.js');
    loadService.loadScript('assets/js/main.js');
  }

  ngOnInit(): void {
  }

  submit(loginForm: NgForm) {
    alert('Welcome back!\n' + loginForm.value.email);
    console.log(loginForm.value);
  }
}
