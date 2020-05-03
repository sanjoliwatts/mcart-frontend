import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { Router } from '@angular/router';
import { Products } from '../products/products';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  orderList:Products[];
  totalAmount: number;

  constructor(private productService:ProductServiceService, private router: Router) { }

  ngOnInit(): void {
    this.orderList = this.productService.cart;
    this.totalAmount = this.productService.totalCost;
  }
  
  navigateToProducts(){
    this.router.navigate(['/products']);
  }


}
