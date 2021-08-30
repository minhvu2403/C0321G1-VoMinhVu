import {Component, Inject, OnInit, Optional} from '@angular/core';
import {GalleryConfig} from './token';

@Component({
  selector: 'app-img-slider',
  templateUrl: './img-slider.component.html',
  styleUrls: ['./img-slider.component.css']
})
export class ImgSliderComponent implements OnInit {
  listImage = [
    'https://via.placeholder.com/1280x420/e91e63/ffffff?text=1',
    'https://via.placeholder.com/1280x420/e91e63/ffffff?text=2',
    'https://via.placeholder.com/1280x420/e91e63/ffffff?text=3',
    'https://via.placeholder.com/1280x420/e91e63/ffffff?text=4'
  ];
  index = 0;
  itemWidth: number;
  config = 4;

  constructor(@Inject(GalleryConfig)
              @Optional()
                config: number) {
    if (config) {
      this.config = config;
    }

  }

  ngOnInit(): void {
    this.itemWidth = 100 / this.config;

  }

  showPrev() {
    return this.index = (this.index < this.listImage.length - 1) ? --this.index : this.listImage.length - 1;

  }

  showNext() {
    return this.index = (this.index < this.listImage.length - 1) ? ++this.index : 0;
  }

}
