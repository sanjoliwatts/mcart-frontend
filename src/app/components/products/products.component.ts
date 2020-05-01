import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { Products } from './products';
import { CommentStmt } from '@angular/compiler';

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


  constructor(private productService:ProductServiceService) { }

  ngOnInit(): void {
    this.getProductsInit('mobiles');
    this.getProductsInit('tablets');
    
    setTimeout(c =>
      {
        this.productList = this.mobileList;
        console.log(this.productList);
      },3000);
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
    this.noOfItems++;
    this.totalCost+= product.price;
    console.log("this.totalCost "+JSON.stringify(product));
  }

  search(){
    this.productList = this.productList.filter((product) => 
      product.productName.toLowerCase().indexOf(this.searchText)!=-1
    );
    console.log(this.productList);
  }

  displayProductDetails(product){
    
  }

}
