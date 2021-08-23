import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../service/product.service";
import {LoadCssService} from "../../../service/load-css.service";
import {Product} from "../../../model/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products:  Product [] =[];
  p = 0;
  idProduct:number;
  nameProduct:string;

  constructor(private productService: ProductService,
              private loadService: LoadCssService,) {
    loadService.loadCss('assets/css/mdb.min.css');
    // loadService.loadCss('assets/css/bootstrap.min.css');
    // loadService.loadScript('assets/js/jquery-3.6.0.js');
    loadService.loadScript('assets/js/bootstrap.min.js');
    loadService.loadScript('assets/js/mdb.min.js');
  }

  ngOnInit(): void {
    this.initData();

  }

  initData() {
    this.productService.getAllProduct().subscribe(data =>{
     this.products =data;
     console.log('data product' +JSON.stringify(this.products));
    },error => {
      console.log('loi data' +error);
    })
  }
  getProduct(product:Product){
    this.idProduct= product.id;
    this.nameProduct =product.productName;
  }
  deleteSuccess(){
    this.ngOnInit();
  }
}
