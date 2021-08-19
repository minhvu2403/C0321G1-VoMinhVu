import {Component, OnInit} from '@angular/core';
import {LoadCssService} from "../../../service/load-css.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ServicesService} from "../../../service/services-service/services.service";
import {RentType} from "../../../model/services/rent-type";
import {Service} from "../../../model/services/service";
import {CustomerType} from "../../../model/customer/customer-type";

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  rentTypes: RentType[] = [];
  services: Service[] = [];
  idService: number;
  nameService: string;
  p = 0;
  serviceModelObj: Service = new Service();
  serviceForm: FormGroup;
  showAdd !: boolean;
  showUpdate !: boolean;
  selectedValue: RentType;

  clickService() {
    this.serviceForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  constructor(private serviceService: ServicesService,
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
    this.getListService();
  }

  initData() {
    this.serviceService.getListRentType().subscribe(data => {
      this.rentTypes = data;
    })
  }
  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  getListService() {
    this.serviceService.getAll().subscribe(data => {
      this.services = data;
    }, error => {
      console.log('Loi getListService:' + error);
    })
  }

  createService() {
    if (this.serviceForm.valid) {
      this.serviceModelObj.serviceCode = this.serviceForm.value.serviceCode;
      this.serviceModelObj.serviceName = this.serviceForm.value.serviceName;
      this.serviceModelObj.serviceArea = this.serviceForm.value.serviceArea;
      this.serviceModelObj.serviceCost = this.serviceForm.value.serviceCost;
      this.serviceModelObj.serviceMaxPeople = this.serviceForm.value.serviceMaxPeople;
      this.serviceModelObj.numberOfFloor = this.serviceForm.value.numberOfFloor;
      this.serviceModelObj.serviceStatus = this.serviceForm.value.serviceStatus;
      this.serviceModelObj.rentType = this.serviceForm.value.rentType;
      this.serviceService.saveService(this.serviceForm.value).subscribe(() => {
        console.log('du lieu data service:' + JSON.stringify(this.serviceForm.value));
        this.serviceForm.reset();
        this.getListService();
      }, error => {
        console.log('Loi create:' + error);
      });
    }
    this.toastr.success('Create successfully', 'Service!');

  }

  onEdit(service: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.serviceModelObj.id = service.id;
    this.serviceForm.controls.serviceCode.setValue(service.serviceCode);
    this.serviceForm.controls.serviceName.setValue(service.serviceName);
    this.serviceForm.controls.rentType.setValue(service.rentType);
    this.serviceForm.controls.serviceArea.setValue(service.serviceArea);
    this.serviceForm.controls.serviceCost.setValue(service.serviceCost);
    this.serviceForm.controls.serviceMaxPeople.setValue(service.serviceMaxPeople);
    this.serviceForm.controls.numberOfFloor.setValue(service.numberOfFloor);
    this.serviceForm.controls.serviceStatus.setValue(service.serviceStatus);
    this.selectedValue = service.rentType;
  }


  initForm() {
    this.serviceForm = this.formBuilder.group({
      serviceCode: new FormControl('', [
        Validators.required,
        Validators.pattern('^DV-[0-9]{4}$')]),
      serviceName: new FormControl('', [
        Validators.required]),
      serviceArea: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(0)]),
      serviceCost: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(0)]),
      serviceMaxPeople: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(0)]),
      numberOfFloor: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.min(0)]),
      serviceStatus: new FormControl('', [
        Validators.required]),
      rentType: new FormControl(''),
    });
  }

  checkVail(attribute: string, error: string) {
    return (this.serviceForm.get(attribute).hasError(error) && (this.serviceForm.get(attribute).touched || this.serviceForm.get(attribute).dirty));
  }

  validation_messages = {
    serviceCode: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'pattern', msg: 'Code customer must format DV-XXXX'}
    ],
    serviceName: [
      {'type': 'required', msg: 'Not empty'}
    ],
    serviceArea: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'min', msg: 'Input must great 0'},
      {'type': 'pattern', msg: 'Cost must format number'},
    ],
    serviceCost: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'min', msg: 'Input must great 0'},
      {'type': 'pattern', msg: 'Cost must format number'},
    ],
    serviceMaxPeople: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'pattern', msg: 'Cost must format number'},
      {'type': 'min', msg: 'Input must great 0'},

    ],
    numberOfFloor: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'pattern', msg: 'Cost must format number'},
      {'type': 'min', msg: 'Input must great 0'},

    ],
    serviceStatus: [
      {'type': 'required', msg: 'Not empty'}
    ],
    // age:[
    //   {'type': 'validAge', msg:'Age must be great 18' },
    // ],
    number: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'pattern', msg: 'Input must format number'},
      {'type': 'min', msg: 'Input must great 0'},
    ],
  }

  updateService() {
    this.serviceModelObj.serviceCode = this.serviceForm.value.serviceCode;
    this.serviceModelObj.serviceName = this.serviceForm.value.serviceName;
    this.serviceModelObj.serviceArea = this.serviceForm.value.serviceArea;
    this.serviceModelObj.serviceCost = this.serviceForm.value.serviceCost;
    this.serviceModelObj.serviceMaxPeople = this.serviceForm.value.serviceMaxPeople;
    this.serviceModelObj.numberOfFloor = this.serviceForm.value.numberOfFloor;
    this.serviceModelObj.serviceStatus = this.serviceForm.value.serviceStatus;
    this.serviceModelObj.rentType = this.serviceForm.value.rentType;
    this.serviceService.updateService(this.serviceModelObj.id, this.serviceModelObj).subscribe( data =>{
      this.serviceForm.reset();
      this.getListService();
    });
    this.toastr.success('Update successfully', 'Service!');

  }

  getDeleteService(service:Service){
    this.idService =service.id;
    this.nameService =service.serviceName;
  }
  deleteService(){
    this.serviceService.deleteService(this.idService).subscribe(data =>{
      this.getListService();
    },error => {
      console.log('Loi delete:' +error);
    })
    this.toastr.success('Delete successfully', 'Service!');
  }
}
