import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../model/category";
import {ProductService} from "../../../service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoadCssService} from "../../../service/load-css.service";
import {Product} from "../../../model/product";
import {ValidateMessageService} from "../../../validator/validate-message.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  editForm: FormGroup;
  category: Category[];
  id: number;
  productObj: Product = new Product();
  selectedValueCategory: Category;

  constructor(private productService: ProductService,
              private router: Router,
              private loadService: LoadCssService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              public validMsg: ValidateMessageService,
              private toastr: ToastrService
  ) {
    loadService.loadCss('assets/css/mdb.min.css');
    // loadService.loadCss('assets/css/bootstrap.min.css');
    // loadService.loadScript('assets/js/jquery-3.6.0.js');
    loadService.loadScript('assets/js/bootstrap.min.js');
    loadService.loadScript('assets/js/mdb.min.js');
  }

  ngOnInit(): void {
    this.getCategory();
    this.updateForm();
    this.getProduct(this.id);
  }

  getCategory() {
    this.productService.getListCategory().subscribe(data => {
      this.category = data;
    })
  }

  updateForm() {
    this.editForm = this.formBuilder.group({
      productCode: this.formBuilder.control('', [Validators.required, Validators.pattern('^SP-[0-9]{4}$')]),
      productName: this.formBuilder.control('', [Validators.required,]),
      priceProduct: this.formBuilder.control('', [Validators.required,]),
      importDateProduct: this.formBuilder.control('', [Validators.required,
        Validators.pattern('(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[012])-(\\d{4})$')]),
      exportDateProduct: this.formBuilder.control('', [Validators.required,
        Validators.pattern('(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[012])-(\\d{4})$')]),
      quantityProduct: this.formBuilder.control('', [Validators.required, Validators.pattern('[0-9]+'), Validators.min(0)]),
      producerProduct: this.formBuilder.control('', [Validators.required,]),
      category: this.formBuilder.control('', [Validators.required,]),
    });
    this.activatedRoute.paramMap.subscribe(data => {
      this.id = Number(data.get('id'));
      console.log('day la id:' + this.id);
    });
    this.productService.findById(this.id).subscribe(data => {
      this.productObj = data;
      this.editForm.patchValue(data);
    })
  }

  getProduct(id: number) {
    this.productService.findById(id).subscribe(data => {
      this.editForm.setValue({
        productCode: this.productObj.productCode,
        productName: this.productObj.productName,
        producerProduct: this.productObj.producerProduct,
        priceProduct: this.productObj.priceProduct,
        quantityProduct: this.productObj.quantityProduct,
        importDateProduct: this.productObj.importDateProduct,
        exportDateProduct: this.productObj.exportDateProduct,
        category: this.productObj.category,
      })
      this.selectedValueCategory = this.productObj.category;
      console.log('day la getProduct' + JSON.stringify(this.selectedValueCategory));
    });
  }

  checkVail(attribute: string, error: string) {
    return (this.editForm.get(attribute).hasError(error) && (this.editForm.get(attribute).touched || this.editForm.get(attribute).dirty));
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  update() {
    if (this.editForm.valid) {
      this.productObj.quantityProduct = this.editForm.value.quantityProduct;
      this.productObj.productCode = this.editForm.value.productCode;
      this.productObj.productName = this.editForm.value.productName;
      this.productObj.priceProduct = this.editForm.value.priceProduct;
      this.productObj.producerProduct = this.editForm.value.producerProduct;
      this.productObj.importDateProduct = this.editForm.value.importDateProduct;
      this.productObj.exportDateProduct = this.editForm.value.exportDateProduct;
      this.productObj.category = this.editForm.value.category;
      if (this.productObj.quantityProduct > 0) {
        this.productObj.status = 'con hang';
      } else {
        this.productObj.status = 'het hang';
      }
      this.productService.updateProduct(this.id, this.productObj).subscribe(data => {
        this.router.navigateByUrl('/list');
      }, error => {
        console.log('Loi update:' + error);
      });
      this.toastr.success('Update successfully', 'Product!');

    }
  }
}
