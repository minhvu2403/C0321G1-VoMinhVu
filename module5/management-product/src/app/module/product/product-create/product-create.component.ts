import {Component, OnInit} from '@angular/core';
import {LoadCssService} from "../../../service/load-css.service";
import {ProductService} from "../../../service/product.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../model/category";
import {Product} from "../../../model/product";
import {Router} from "@angular/router";
import {CheckDateOfDay} from "../../../validator/check-date-of-day";
import {ValidateMessageService} from "../../../validator/validate-message.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  createForm: FormGroup;
  category: Category[];
  productObj: Product = new Product();

  constructor(private loadService: LoadCssService,
              private formBuilder: FormBuilder,
              private productService: ProductService,
              private  router: Router,
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
    this.initForm();
  }

  getCategory() {
    this.productService.getListCategory().subscribe(data => {
      this.category = data;
    }, error => {
      console.log('loi category:' + error);
    })
  }

  checkVail(attribute: string, error: string) {
    return (this.createForm.get(attribute).hasError(error) && (this.createForm.get(attribute).touched || this.createForm.get(attribute).dirty));
  }

  initForm() {
    this.createForm = this.formBuilder.group({
      productCode: this.formBuilder.control('', [Validators.required, Validators.pattern('^SP-[0-9]{4}$')]),
      productName: this.formBuilder.control('', [Validators.required,]),
      priceProduct: this.formBuilder.control('', [Validators.required,]),
      importDateProduct: this.formBuilder.control('', [Validators.required,
        // Validators.pattern('(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[012])-(\\d{4})$')
      //  Validators.pattern('^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$')
      ]),

      exportDateProduct: this.formBuilder.control('', [Validators.required,
        // Validators.pattern('(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[012])-(\\d{4})$'),
        //Validators.pattern('^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$'),
        CheckDateOfDay]),
      quantityProduct: this.formBuilder.control('', [Validators.required, Validators.pattern('[0-9]+'), Validators.min(0)]),
      producerProduct: this.formBuilder.control('', [Validators.required,]),
      category: this.formBuilder.control('', [Validators.required,]),

    })
  }


  createProduct() {
    if (this.createForm.valid) {
      this.productObj.quantityProduct = this.createForm.value.quantityProduct;
      this.productObj.productCode = this.createForm.value.productCode;
      this.productObj.productName = this.createForm.value.productName;
      this.productObj.priceProduct = this.createForm.value.priceProduct;
      this.productObj.producerProduct = this.createForm.value.producerProduct;
      this.productObj.importDateProduct = this.createForm.value.importDateProduct;
      this.productObj.exportDateProduct = this.createForm.value.exportDateProduct;
      this.productObj.category = this.createForm.value.category;
      if (this.productObj.quantityProduct > 0) {
        this.productObj.status = 'con hang';
      } else {
        this.productObj.status = 'het hang';
      }
      console.log(JSON.stringify(this.productObj));
      this.productService.saveProduct(this.productObj).subscribe(data => {
        this.router.navigateByUrl('/list');
      }, error => {
        console.log('Loi create:' + error);
      });
      this.toastr.success('Create successfully', 'Product!');
    }
  }

}
