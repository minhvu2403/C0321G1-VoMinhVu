import {Component, OnInit} from '@angular/core';
import {LoadCssService} from "../../../service/load-css.service";
import {Customer} from "../../../model/customer/customer";
import {CustomerService} from "../../../service/customer-service/customer.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerType} from "../../../model/customer/customer-type";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  idCustomer: number;
  nameCustomer: string;
  p = 0;
  customerModelObj: Customer = new Customer();
  customerForm: FormGroup;
  customerTypes: CustomerType[] = [];
  showAdd !: boolean;
  showUpdate !: boolean;
  selectedValue: CustomerType;
  constructor(private customerService: CustomerService,
              private loadService: LoadCssService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) {
    loadService.loadCss('assets/css/mdb.min.css');
    // loadService.loadCss('assets/css/bootstrap.min.css');
    // loadService.loadScript('assets/js/jquery-3.6.0.js');
    loadService.loadScript('assets/js/bootstrap.min.js');
    loadService.loadScript('assets/js/mdb.min.js');
  }

  ngOnInit(): void {
    this.initData();
    this.initForm();
    this.getListCustomer();
  }

  initData() {
    this.customerService.getCustomerType().subscribe(data => {
      this.customerTypes = data;
    })
  }

  getListCustomer() {
    this.customerService.getAll().subscribe(data => {
      this.customers = data;
     // console.log('xem data:' + JSON.stringify(this.customers));
    }, error => {
      console.log('loi getListCustomer:' + error);
    })
  }

  clickCustomer() {
    this.customerForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  initForm() {
    this.customerForm = this.formBuilder.group({
      customerCode: new FormControl('', [
        Validators.required,
        Validators.pattern('^KH-[0-9]{4}$')
      ]),
      customerName: new FormControl('', [
        Validators.required
      ]),
      dateOfBirth: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$')
      ]),
      customerCard: new FormControl('', [
        Validators.required,
        Validators.pattern('^([0-9]{9}|[0-9]{12})$')
      ]),
      customerPhone: new FormControl('', [
        Validators.required,
        Validators.pattern('^(090|091)[0-9]{7}$')]),

      customerEmail: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      customerAddress: new FormControl('', [
        Validators.required
      ]),
      customerType: new FormControl('', [Validators.required]),
    });

  }

  checkVail(attribute: string, error: string) {
    return (this.customerForm.get(attribute).hasError(error) && (this.customerForm.get(attribute).touched || this.customerForm.get(attribute).dirty));
  }

  createCustomer() {
    if (this.customerForm.valid) {
      this.customerModelObj.customerCode = this.customerForm.value.customerCode;
      this.customerModelObj.customerName = this.customerForm.value.customerName;
      this.customerModelObj.customerType = this.customerForm.value.customerType;
      this.customerModelObj.dateOfBirth = this.customerForm.value.dateOfBirth;
      this.customerModelObj.customerCard = this.customerForm.value.customerCard;
      this.customerModelObj.customerPhone = this.customerForm.value.customerPhone;
      this.customerModelObj.customerAddress = this.customerForm.value.customerAddress;
      this.customerModelObj.customerEmail = this.customerForm.value.customerEmail;
      this.customerService.saveCustomer(this.customerForm.value).subscribe(() => {
        //  this.createComplete.emit(true);
        console.log('du lieu data create:' + JSON.stringify(this.customerForm.value));
        this.customerForm.reset();
        this.getListCustomer();
        //console.log('du lieu data create:' + JSON.stringify(this.customerForm.value));
      }, error => {
        console.log('Loi create:' + error);
      });
    }
    this.toastr.success('Create successfully', 'Customer!');
    console.log('day la customerModalObj:' + JSON.stringify(this.customerModelObj));
  }

  onEdit(customer: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.customerModelObj.id = customer.id;
    this.customerForm.controls.customerCode.setValue(customer.customerCode);
    this.customerForm.controls.customerName.setValue(customer.customerName);
    this.customerForm.controls.customerType.setValue(customer.customerType);
    this.customerForm.controls.dateOfBirth.setValue(customer.dateOfBirth);
    this.customerForm.controls.customerCard.setValue(customer.customerCard);
    this.customerForm.controls.customerPhone.setValue(customer.customerPhone);
    this.customerForm.controls.customerEmail.setValue(customer.customerEmail);
    this.customerForm.controls.customerAddress.setValue(customer.customerAddress);
    this.selectedValue = customer.customerType;
    console.log(' day l selectValue:' + JSON.stringify(this.selectedValue));
  }

  validation_messages = {
    customerCode: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'pattern', msg: 'Code customer must format KH-XXXX'}
    ],
    customerName: [
      {'type': 'required', msg: 'Not empty'}
    ],
    customerAddress: [
      {'type': 'required', msg: 'Not empty'}
    ],
    customerType: [
      {'type': 'required', msg: 'Not empty'}
    ],
    customerEmail: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'email', msg: 'Email format email@'},
    ],
    dateOfBirth: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'pattern', msg: 'Date must format date dd/MM/yyy'},
    ],
    // age:[
    //   {'type': 'validAge', msg:'Age must be great 18' },
    // ],
    number: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'pattern', msg: 'Input must format number'},
      {'type': 'min', msg: 'Input must great 0'},
    ],
    customerCard: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'pattern', msg: 'Id Card must format XXXXXXXXX or XXXXXXXXXXXX'},
    ],
    customerPhone: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'pattern', msg: 'Phone must format (090 || 091)XXXXXXX'},
    ],

  }
  updateCustomer() {
    this.customerModelObj.customerCode = this.customerForm.value.customerCode;
    this.customerModelObj.customerName = this.customerForm.value.customerName;
    this.customerModelObj.dateOfBirth = this.customerForm.value.dateOfBirth;
    this.customerModelObj.customerCard = this.customerForm.value.customerCard;
    this.customerModelObj.customerPhone = this.customerForm.value.customerPhone;
    this.customerModelObj.customerAddress = this.customerForm.value.customerAddress;
    this.customerModelObj.customerEmail = this.customerForm.value.customerEmail;
    this.customerModelObj.customerType = this.customerForm.value.customerType;
    this.customerService.updateCustomer(this.customerModelObj.id, this.customerModelObj).subscribe(data => {
      this.customerForm.reset();
      this.getListCustomer();
    });
    this.toastr.success('Update successfully', 'Customer!');
  }
  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  getDeleteCustomer(customer: Customer) {
    this.idCustomer =customer.id;
    this.nameCustomer =customer.customerName;
  }
  deleteCustomer(){
    this.customerService.deleteCustomer(this.idCustomer).subscribe(data =>{
      this.getListCustomer();
    },error => {
      console.log('Loi xoa'+error);
    });
    this.toastr.success('Delete successfully', 'Customer!');
  }
}
