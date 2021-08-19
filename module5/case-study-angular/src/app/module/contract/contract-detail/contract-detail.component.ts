import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Contract} from "../../../model/contract/contract";
import {AttachService} from "../../../model/contract/attach-service";
import {ContractService} from "../../../service/contract-service/contract.service";
import {Router} from "@angular/router";
import {LoadCssService} from "../../../service/load-css.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class ContractDetailComponent implements OnInit {
  contractDetailForm: FormGroup;
  contracts: Contract[];
  attachService: AttachService[];

  constructor(private contractService: ContractService,
              private  router: Router,
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
    this.getList();
    this.createForm();
  }

  getList() {
    this.contractService.getAttachService().subscribe(attachServices => {
      console.log('day la attachService:' + attachServices);
      this.attachService = attachServices;
    });
    this.contractService.getAll().subscribe(contracts => {
      console.log(contracts);
      this.contracts = contracts;
    })
  }

  createForm() {
    this.contractDetailForm = new FormGroup({
      contractId: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.pattern('[0-9]+'), Validators.min(0)]),
      attachService: new FormControl('', [Validators.required])
    })
  }

  createContractDetail() {
    if (this.contractDetailForm.valid) {
      this.contractService.saveContractDetail(this.contractDetailForm.value).subscribe(() => {
        this.router.navigateByUrl('');
      });

    }
    this.toastr.success('ContractDetail', 'Them thanh cong !');
  }
}


