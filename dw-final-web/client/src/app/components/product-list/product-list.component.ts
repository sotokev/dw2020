import { Component, HostBinding, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  products : any = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productService.getProductList().subscribe(
      res => {
        this.products = res;
      },
      err => console.error(err)
    )
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id)
      .subscribe(
        res => {
          console.log(res);
          this.getProductList()
        },
        err => console.error(err)
      )
  }

}
