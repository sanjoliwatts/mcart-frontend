import { Component, OnInit, OnChanges } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { Router } from '@angular/router';
import { Products } from '../products/products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    throw new Error("Method not implemented.");
  }
  productList:Products[];
  totalAmount: number;

  constructor(private productService:ProductServiceService, private router: Router) { }

  ngOnInit(): void {
    this.productList = this.productService.cart;
    this.totalAmount = this.productService.totalCost;
  }

  updateCart(product){
   // this.productService.addToCart(product);
    this.totalAmount = this.productService.calculateTotal();
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
