import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  id: any;

  constructor(private productService: ProductService,
              private activateRouter: ActivatedRoute,
              private  router: Router) {
  }

  ngOnInit(): void {
    this.activateRouter.paramMap.subscribe((paramMap: ParamMap) => {
      // tslint:disable-next-line:radix
      this.id = parseInt(paramMap.get('id'));
    });
  }

  confirmDelete() {
    this.productService.deleteProduct(this.id);
  }

}
