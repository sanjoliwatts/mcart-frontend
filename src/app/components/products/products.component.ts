import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { Products } from './products';
import { CommentStmt } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  noOfItems:number = 0;
  totalCost:number = 0;
  mobileUrl = "./assets/products/mobiles.json";
  tabletUrl = "./assets/products/tablets.json";
  mobileList:Products[];
  tabletList:Products[];
  productList:Products[];
  errorMessage: string;
  activeComponent:string = "mobiles";
  sortoption="relevance";
  searchText:string;
  cart:Array<Products>;
  pp:[Products];


  constructor(private productService:ProductServiceService, private router: Router) { }

  ngOnInit(): void {
    this.initializeCart();
   // console.log("Inside init "+this.productService.cart);
    this.getProductsInit('mobiles');
    this.getProductsInit('tablets');
     
    
    setTimeout(c =>
      {
        this.productList = this.mobileList;
        console.log(this.productList);
      },2000);
  }

  getProducts(productType){
    this.searchText = '';
    if(productType == 'mobiles'){
      this.activeComponent = "mobiles";
      this.productList = this.mobileList;
    }
    else{
      console.log("Inside else");
      this.activeComponent = "tablets";
      this.productList = this.tabletList;
    }
  }

  getProductsInit(productType){
    if(productType == "mobiles"){
      this.productService.getProducts(this.mobileUrl).subscribe(
        mobileList => {
          console.log(mobileList);
          this.mobileList = mobileList;
        },
        err => {
          this.errorMessage = err.error.message;

        }
      );
    }
    else{
      this.productService.getProducts(this.tabletUrl).subscribe(
        tabletList => {
          console.log(tabletList);
          this.tabletList = tabletList;
        },
        err => {
          this.errorMessage = err.error.message;
        }
      );
    }
    
  }

  onChange(option){
    this.sortoption = option;
  }

  addToCart(product){
    this.productService.addToCart(product);
    //this.cart.push(product);
    this.noOfItems = this.productService.noOfItems;
    this.totalCost= this.productService.totalCost;
    console.log("this.totalCost "+this.productService.cart);
  }

  search(){
    this.productList = this.productList.filter((product) => 
      product.productName.toLowerCase().indexOf(this.searchText)!=-1
    );
    console.log(this.productList);
  }

  displayProductDetails(product){
    this.router.navigate(['/productDetails', product.productId]);
  }

  navigateToCart(){
    console.log("navigate");
    this.router.navigate(['/cart']);
  }

  initializeCart(){
    this.cart = this.productService.cart;
    this.noOfItems = this.productService.noOfItems;
    this.totalCost = this.productService.totalCost;
  }

}
