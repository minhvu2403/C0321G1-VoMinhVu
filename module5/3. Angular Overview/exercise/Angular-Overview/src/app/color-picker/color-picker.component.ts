import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {
  color = 'black';

  constructor() { }

  ngOnInit(): void {
  }

  pickColor(color: string) {
    this.color = color;
  }

}
