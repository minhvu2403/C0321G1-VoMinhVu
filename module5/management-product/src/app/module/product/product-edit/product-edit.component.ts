import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  checkValid(attribute:string ,error:string){
    return(([attribute]) && this.editForm.get(attribute).hasError(error));
  }
  updateForm() {
    this.editForm =new FormGroup({
      productCode: new FormControl('', [Validators.required, Validators.pattern('^SP-[0-9]{4}$')]),
      productName:new FormControl('', [Validators.required,]),
      priceProduct: new FormControl('', [Validators.required,]),
      dateGroup:new FormGroup({
        importDateProduct: new FormControl('', [Validators.required,
          // Validators.pattern('(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[012])-(\\d{4})$')
          Validators.pattern('^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$')
        ]),
        exportDateProduct: new FormControl('', [Validators.required,
          // Validators.pattern('(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[012])-(\\d{4})$'),
          Validators.pattern('^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$'),

        ]),
      },this.validDate),
      quantityProduct: new FormControl('', [Validators.required, Validators.pattern('[0-9]+'), Validators.min(0)]),
      producerProduct: new FormControl('', [Validators.required,]),
      category: new FormControl('', [Validators.required,]),
    });
    this.activatedRoute.paramMap.subscribe(data => {
      this.id = Number(data.get('id'));
      console.log('day la id:' + this.id);
    });
    this.productService.findById(this.id).subscribe(data => {
      this.productObj = data;
      this.editForm.patchValue(data);
      console.log(data);
    })
  }

  getProduct(id: number) {
    this.productService.findById(id).subscribe(data => {
      this.editForm.patchValue({
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
      console.log('day la getProduct' + JSON.stringify(this.editForm.value));
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
      this.productObj =Object.assign({},this.editForm.value);
      this.productObj.importDateProduct = this.editForm.value.dateGroup.importDateProduct;
      this.productObj.exportDateProduct = this.editForm.value.dateGroup.exportDateProduct;
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
  validDate(control: AbstractControl): any {
    let dayValue = control.value;
    let start = new Date(dayValue.importDateProduct);
    let end = new Date(dayValue.exportDateProduct);
    console.log('start:'+JSON.stringify(start))
    console.log('end' +JSON.stringify(end))
    if (end.getTime() - start.getTime() <= 0) {
      return {validDate: true};
    }
    return null;
  }
}
