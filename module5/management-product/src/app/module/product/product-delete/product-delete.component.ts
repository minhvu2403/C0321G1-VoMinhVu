import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductService} from "../../../service/product.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  @Input()
  deleteId: number;
  @Input()
  deleteName: string;
  @Output()
  deleteComplete = new EventEmitter<boolean>();
  constructor(public productService:ProductService,
              public router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }
 deleteProduct(){
    this.productService.deleteProduct(this.deleteId).subscribe(data=>{
      document.getElementById('closeModal').click();
      this.deleteComplete.emit(true);
    },error => {
      console.log('Loi delete:' +error);
    });
   this.toastr.success('Delete successfully', 'Product!');

 }
}
