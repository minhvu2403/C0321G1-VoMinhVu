import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {LoadCssService} from '../../../load-css.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private  productService: ProductService,
              private categoryService: CategoryService,
              private loadService: LoadCssService) {
    loadService.loadCss('assets/css/mdb.min.css');
    loadService.loadScript('assets/js/mdb.min.js');
    loadService.loadScript('assets/js/main.js');

  }

  // dataSource = new MatTableDataSource<Product>(this.products);
  dataSource = new ProductDataSource(this.productService);
  displayedColumns: string[] = ['id', 'name', 'price', 'description', 'category'];

  ngOnInit(): void {
    this.getAll();
    this.getAllCategory();
  }

  getAll() {
    this.productService.getAll().subscribe(products => {
      this.products = products;
    });
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe(categoires => {
      this.categories = categoires;
    });
  }


}

// const ELEMENT_DATA: Product[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
// ];

export class ProductDataSource extends DataSource<any> {
  constructor(private productService: ProductService) {
    super();
  }

  connect(): Observable<Product[]> {
    return this.productService.getAll();
  }

  disconnect() {
  }
}
