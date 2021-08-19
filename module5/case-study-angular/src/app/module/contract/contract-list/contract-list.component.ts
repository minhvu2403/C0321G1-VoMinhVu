import {Component, OnInit} from '@angular/core';
import {Contract} from "../../../model/contract/contract";
import {ContractDetail} from "../../../model/contract/contract-detail";
import {ContractService} from "../../../service/contract-service/contract.service";
import {LoadCssService} from "../../../service/load-css.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CustomerService} from "../../../service/customer-service/customer.service";
import {EmployeeService} from "../../../service/employee-service/employee.service";
import {ServicesService} from "../../../service/services-service/services.service";
import {Customer} from "../../../model/customer/customer";
import {Employee} from "../../../model/employee/employee";
import {Service} from "../../../model/services/service";

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {
  contracts: Contract[];
  contractDetails: ContractDetail[];
  name: string;
  p = 0;
  contractForm: FormGroup;
  customers: Customer[];
  employees: Employee[];
  services: Service[];
  showAdd !: boolean;
  showUpdate !: boolean;
  contractModelObj: Contract = new Contract();
  selectedValueCustomer: Customer;
  selectedValueEmployee: Customer;
  selectedValueService: Service;
  idContract:number;
  nameCustomer: string;

  constructor(private contractService: ContractService,
              private loadService: LoadCssService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private customerService: CustomerService,
              private employeeService: EmployeeService,
              private serviceService: ServicesService) {
    loadService.loadCss('assets/css/mdb.min.css');
    // loadService.loadCss('assets/css/bootstrap.min.css');
    // loadService.loadScript('assets/js/jquery-3.6.0.js');
    loadService.loadScript('assets/js/bootstrap.min.js');
    loadService.loadScript('assets/js/mdb.min.js');
  }

  ngOnInit(): void {
    this.initData();
    this.getListContract();
    this.getListDetail();
    this.initForm();
  }
 clickContract(){
    this.contractForm.reset();
   this.showAdd = true;
   this.showUpdate = false;

 }
  initData() {
    this.customerService.getAll().subscribe(customers => {
      this.customers = customers;
    });
    this.employeeService.getAll().subscribe(employees => {
      this.employees = employees;
    })
    this.serviceService.getAll().subscribe(services => {
      this.services = services;
    })
  }

  getListDetail() {
    this.contractService.getListContractDetail().subscribe(data => {
      this.contractDetails = data;
    })
  }

  getListContract() {
    this.contractService.getAll().subscribe(data => {
      this.contracts = data;
    })
  }
  initForm(){
    this.contractForm = this.formBuilder.group({
      customer: new FormControl('', [Validators.required]),
      employee: new FormControl('', [Validators.required]),
      service: new FormControl('', [Validators.required]),
      contractStartDate: new FormControl('', [Validators.required]),
      contractEndDate: new FormControl('', [Validators.required]),
      contractDeposit: new FormControl('', [Validators.required, Validators.pattern('[0-9]+'), Validators.min(0)]),
    }, this.validDate);
  }

  validDate(control : AbstractControl){
    const v = control.value;
    const start = new Date(v.contractStartDate);
    const end = new Date(v.contractEndDate);
    if(end.getTime() - start.getTime() <=0 ){
      return {'validDate': true};
    }
    return null;
  }
  checkVail(attribute: string, error: string) {
    return (this.contractForm.get(attribute).hasError(error) && (this.contractForm.get(attribute).touched || this.contractForm.get(attribute).dirty));
  }
  createContract(){
    if (this.contractForm.valid){
      this.contractModelObj.customer =this.contractForm.value.customer;
      this.contractModelObj.employee =this.contractForm.value.employee;
      this.contractModelObj.service =this.contractForm.value.service;
      this.contractModelObj.contractStartDate =this.contractForm.value.contractStartDate;
      this.contractModelObj.contractEndDate =this.contractForm.value.contractEndDate;
      this.contractModelObj.contractDeposit =this.contractForm.value.contractDeposit;
      this.contractService.saveContract(this.contractForm.value).subscribe(()=>{
        console.log('du lieu data create:' + JSON.stringify(this.contractForm.value));
        this.contractForm.reset();
        this.getListContract();
      },error => {
        console.log('Loi create:' +error);
      })
    }
    this.toastr.success('Create successfully', 'Contract!');

  }
onEdit(contract: any){
  this.showAdd = false;
  this.showUpdate = true;
  this.contractModelObj.id =contract.id;
  this.contractForm.controls.customer.setValue(contract.customer);
  this.contractForm.controls.employee.setValue(contract.employee);
  this.contractForm.controls.service.setValue(contract.service);
  this.contractForm.controls.contractStartDate.setValue(contract.contractStartDate);
  this.contractForm.controls.contractEndDate.setValue(contract.contractEndDate);
  this.contractForm.controls.contractDeposit.setValue(contract.contractDeposit);
  this.selectedValueCustomer =contract.customer;
  this.selectedValueEmployee = contract.employee;
  this.selectedValueService = contract.service;
}
updateContract(){
  this.contractModelObj.customer =this.contractForm.value.customer;
  this.contractModelObj.employee =this.contractForm.value.employee;
  this.contractModelObj.service =this.contractForm.value.service;
  this.contractModelObj.contractStartDate =this.contractForm.value.contractStartDate;
  this.contractModelObj.contractEndDate =this.contractForm.value.contractEndDate;
  this.contractModelObj.contractDeposit =this.contractForm.value.contractDeposit;
  this.contractService.updateContract(this.contractModelObj.id, this.contractModelObj).subscribe(data =>{
    this.contractForm.reset();
    this.getListContract();
  });
  this.toastr.success('Update successfully', 'Contract!');

}
  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  getDeleteContract(contract :Contract){
    this.idContract =contract.id;
    this.nameCustomer =contract.customer.customerName;
  }

  deleteContract(){
    this.contractService.deleteContract(this.idContract).subscribe(data =>{
      this.getListContract();
    },error => {
      console.log('Loi xoa' +error);
    });
    this.toastr.success('Delete successfully', 'Contract!');

  }
  validation_messages = {
    customer: [
      {'type': 'required', msg: 'Not empty'}
    ],
    employee: [
      {'type': 'required', msg: 'Not empty'}
    ],
    service: [
      {'type': 'required', msg: 'Not empty'}
    ],
    contractDeposit: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'pattern', msg: 'Input must format number'},
      {'type': 'min', msg: 'Input must great 0'},
    ],
    contractStartDate: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'pattern', msg: 'Date must format date dd/MM/yyy'},
    ],
    contractEndDate: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'pattern', msg: 'Date must format date dd/MM/yyy'},
      {'type': 'validDate', msg: 'End date must great start date'},
    ],
    // age:[
    //   {'type': 'validAge', msg:'Age must be great 18' },
    // ],


  }
}
