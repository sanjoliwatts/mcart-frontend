import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { Router } from '@angular/router';
import { Products } from '../products/products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productList:Products[];

  constructor(private productService:ProductServiceService, private router: Router) { }

  ngOnInit(): void {
    this.productList = this.productService.cart;
  }

  navigateToProducts(){
    this.router.navigate(['/products']);
  }

  navigateToCheckout(){
    this.router.navigate(['/checkout']);
  }

  deleteItem(product){

  }

}
