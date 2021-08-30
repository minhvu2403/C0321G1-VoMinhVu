import {Component, OnInit} from '@angular/core';
import {LoadCssService} from "../../../service/load-css.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {EmployeeService} from "../../../service/employee-service/employee.service";
import {Employee} from "../../../model/employee/employee";
import {Division} from "../../../model/employee/division";
import {Positions} from "../../../model/employee/positions";
import {EducationDegree} from "../../../model/employee/education-degree";
import {OrderPipe} from "ngx-order-pipe";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeForm: FormGroup;
  employees: Employee[] = [];
  idEmployee: number;
  nameEmployee: string;
  p = 0;
  order: string = 'employeeName';
  reverse: boolean = false;
  employeeModelObj: Employee = new Employee();
  divisions: Division[] = [];
  positions: Positions[] = [];
  educationDegrees: EducationDegree[] = [];
  showAdd !: boolean;
  showUpdate !: boolean;
  selectedValueDivision: Division;
  selectedValuePosition: Positions;
  selectedValueEducation: EducationDegree;

  constructor(private employeeService: EmployeeService,
              private loadService: LoadCssService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private orderPipe: OrderPipe
  ) {
    loadService.loadCss('assets/css/mdb.min.css');
    // loadService.loadCss('assets/css/bootstrap.min.css');
    // loadService.loadScript('assets/js/jquery-3.6.0.js');
    loadService.loadScript('assets/js/bootstrap.min.js');
    loadService.loadScript('assets/js/mdb.min.js');
  }

  ngOnInit(): void {
    this.initData();
    this.initForm();
    this.getListEmployee();
  }

  initData() {
    this.employeeService.getListDivision().subscribe(data => {
      this.divisions = data;
    });
    this.employeeService.getListEducationDegree().subscribe(data => {
      this.educationDegrees = data;
    });
    this.employeeService.getListPosition().subscribe(data => {
      this.positions = data;
    })
  }

  getListEmployee() {
    this.employeeService.getAll().subscribe(data => {
      this.employees = data;
    })
  }

  clickEmployee() {
    this.employeeForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  initForm() {
    this.employeeForm = this.formBuilder.group({
      employeeName: new FormControl('', [
        Validators.required,
      ]),
      employeeBirthday: new FormControl('', [Validators.required, Validators.pattern('^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$')]),
      employeeCard: new FormControl('', [Validators.required, Validators.pattern('^([0-9]{9}|[0-9]{12})$')]),
      employeeSalary: new FormControl('', [Validators.required, Validators.pattern('[0-9]+'), Validators.min(0)]),
      employeePhone: new FormControl('', [Validators.required, Validators.pattern('^(090|091)[0-9]{7}$')]),
      employeeEmail: new FormControl('', [Validators.required, Validators.email]),
      employeeAddress: new FormControl('', [
        Validators.required,
      ]),
      division: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      educationDegree: new FormControl('', [Validators.required]),
    })
  }

  checkVail(attribute: string, error: string) {
    return (this.employeeForm.get(attribute).hasError(error) && (this.employeeForm.get(attribute).touched || this.employeeForm.get(attribute).dirty));
  }

  createEmployee() {
    if (this.employeeForm.valid) {
      this.employeeModelObj.employeeName = this.employeeForm.value.employeeName;
      this.employeeModelObj.employeeBirthday = this.employeeForm.value.employeeBirthday;
      this.employeeModelObj.employeeCard = this.employeeForm.value.employeeCard;
      this.employeeModelObj.employeeSalary = this.employeeForm.value.employeeSalary;
      this.employeeModelObj.employeePhone = this.employeeForm.value.employeePhone;
      this.employeeModelObj.employeeEmail = this.employeeForm.value.employeeEmail;
      this.employeeModelObj.employeeAddress = this.employeeForm.value.employeeAddress;
      this.employeeModelObj.division = this.employeeForm.value.division;
      this.employeeModelObj.educationDegree = this.employeeForm.value.educationDegree;
      this.employeeModelObj.position = this.employeeForm.value.position;
      this.employeeService.saveEmployee(this.employeeForm.value).subscribe(() => {
        console.log('du lieu employee:' + JSON.stringify(this.employeeForm.value));
        this.employeeForm.reset();
        this.getListEmployee();
      }, error => {
        console.log('Loi create:' + error);
      });
      this.toastr.success('Create successfully', 'Employee!');
      console.log('day la employeeModalObj:' + JSON.stringify(this.employeeModelObj));

    }
  }

  onEdit(employee: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = employee.id;
    this.employeeForm.controls.employeeName.setValue(employee.employeeName);
    this.employeeForm.controls.employeeBirthday.setValue(employee.employeeBirthday);
    this.employeeForm.controls.employeeCard.setValue(employee.employeeCard);
    this.employeeForm.controls.employeeSalary.setValue(employee.employeeSalary);
    this.employeeForm.controls.employeePhone.setValue(employee.employeePhone);
    this.employeeForm.controls.employeeEmail.setValue(employee.employeeEmail);
    this.employeeForm.controls.employeeAddress.setValue(employee.employeeAddress);
    this.employeeForm.controls.division.setValue(employee.division);
    this.employeeForm.controls.educationDegree.setValue(employee.educationDegree);
    this.employeeForm.controls.position.setValue(employee.position);
    this.selectedValueDivision = employee.division;
    this.selectedValueEducation = employee.educationDegree;
    this.selectedValuePosition = employee.position;
    console.log(' day la selectedValueEducation:' + JSON.stringify(this.selectedValueEducation));
    console.log(' day la selectedValueDivision:' + JSON.stringify(this.selectedValueDivision));
    console.log(' day la selectedValuePosition :' + JSON.stringify(this.selectedValuePosition));

  }

  validation_messages = {
    employeeName: [
      {'type': 'required', msg: 'Not empty'},
    ],
    employeeBirthday: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'pattern', msg: 'Date of birth must format dd/mm/yyyy.'},
    ],
    employeeSalary: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'pattern', msg: 'Input must format number'},
      {'type': 'min', msg: 'Input must great 0'},
    ],
    employeeAddress: [
      {'type': 'required', msg: 'Not empty'}
    ],
    employeeEmail: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'email', msg: 'Email format email@'},
    ],
    // age:[
    //   {'type': 'validAge', msg:'Age must be great 18' },
    // ],
    number: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'pattern', msg: 'Input must format number'},
      {'type': 'min', msg: 'Input must great 0'},
    ],
    employeeCard: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'pattern', msg: 'Id Card must format XXXXXXXXX or XXXXXXXXXXXX'},
    ],
    employeePhone: [
      {'type': 'required', msg: 'Not empty'},
      {'type': 'pattern', msg: 'Phone must format (090 || 091)XXXXXXX'},
    ],
  }
  name: string;

  updateEmployee() {
    this.employeeModelObj.employeeName = this.employeeForm.value.employeeName;
    this.employeeModelObj.employeeBirthday = this.employeeForm.value.employeeBirthday;
    this.employeeModelObj.employeeCard = this.employeeForm.value.employeeCard;
    this.employeeModelObj.employeeSalary = this.employeeForm.value.employeeSalary;
    this.employeeModelObj.employeePhone = this.employeeForm.value.employeePhone;
    this.employeeModelObj.employeeEmail = this.employeeForm.value.employeeEmail;
    this.employeeModelObj.employeeAddress = this.employeeForm.value.employeeAddress;
    this.employeeModelObj.division = this.employeeForm.value.division;
    this.employeeModelObj.educationDegree = this.employeeForm.value.educationDegree;
    this.employeeModelObj.position = this.employeeForm.value.position;
    this.employeeService.updateEmployee(this.employeeModelObj.id, this.employeeModelObj).subscribe(data => {
      this.employeeForm.reset();
      this.getListEmployee();
    });
    this.toastr.success('Update successfully', 'Employee!');

  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  getDeleteEmployee(employee: Employee) {
    this.idEmployee = employee.id;
    this.nameEmployee = employee.employeeName;
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.idEmployee).subscribe(data => {
      this.getListEmployee();
    }, error => {
      console.log('Loi xoa' + error);
    });
    this.toastr.success('Delete successfully', 'Employee!');

  }

  Search() {
    if (this.name === '') {
      this.ngOnInit();
    } else {
      this.employees = this.employees.filter(value => {
        return value.employeeName.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });
    }
    this.p = 0;
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }
}
