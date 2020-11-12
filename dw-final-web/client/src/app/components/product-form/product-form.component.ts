import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  product : Product = {
    id : 0,
    name: '',
    price: 0
  }

  edit: boolean = false;

  constructor(private productService: ProductService, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(params.id){
      this.productService.getProduct(params.id)
        .subscribe(
          res=> {
            this.product = res;
            this.edit = true;
          },
          err => console.error(err)
        )
    }
  }

  saveNewProduct() {
    this.productService.saveProduct(this.product)
      .subscribe(
        res => {
          this.route.navigate(['/product']);
        },
        err => console.error(err)
      )
  }

  updateproduct() {
    this.productService.updateProduct(this.product)
      .subscribe(
        res => {
          this.route.navigate(['/product']);
        },
        err => console.error(err)
      )
  }

}
