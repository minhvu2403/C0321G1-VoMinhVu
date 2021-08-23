import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {CustomerType} from "../../../model/customer/customer-type";
import {CustomerService} from "../../../service/customer-service/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  customerForm: FormGroup;
  customerTypes: CustomerType[] = [];

  constructor(private  customerService: CustomerService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initData();
    this.initForm();
  }

  initData() {
    this.customerService.getCustomerType().subscribe(data => {
      this.customerTypes = data;
    })
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
  @Output()
  createComplete =new EventEmitter<boolean>();

  checkVail(attribute: string, error: string) {
    return (this.customerForm.get(attribute).hasError(error) && (this.customerForm.get(attribute).touched || this.customerForm.get(attribute).dirty));
  }

  createCustomer() {
    if (this.customerForm.valid) {
      this.customerService.saveCustomer(this.customerForm.value).subscribe(() => {
        this.createComplete.emit(true);
        console.log('du lieu data create:'+ this.customerForm.value);
      }, error => {
        console.log('Loi create:' + error);
      });
    }
  }

  validation_messages = {
    customerCode :[
      {'type': 'required', msg:'Not empty' },
      {'type': 'pattern', msg: 'Code customer must format KH-XXXX'}
    ],
    customerName : [
      {'type': 'required', msg:'Not empty' }
    ],
    customerAddress : [
      {'type': 'required', msg:'Not empty' }
    ],
    customerType : [
      {'type': 'required', msg:'Not empty' }
    ],
    customerEmail : [
      {'type': 'required', msg:'Not empty' },
      {'type': 'email', msg:'Email format email@' },
    ],
    dateOfBirth: [
      {'type': 'required', msg:'Not empty' },
      {'type': 'pattern', msg:'Date must format date dd/MM/yyy' },
    ],
    // age:[
    //   {'type': 'validAge', msg:'Age must be great 18' },
    // ],
    number:[
      {'type': 'required', msg:'Not empty' },
      {'type': 'pattern', msg:'Input must format number' },
      {'type': 'min', msg:'Input must great 0' },
    ],
    customerCard:[
      {'type': 'required', msg:'Not empty' },
      {'type': 'pattern', msg:'Id Card must format XXXXXXXXX or XXXXXXXXXXXX' },
    ],
    customerPhone:[
      {'type': 'required', msg:'Not empty' },
      {'type': 'pattern', msg:'Phone must format (090 || 091)XXXXXXX' },
    ],

}

}
