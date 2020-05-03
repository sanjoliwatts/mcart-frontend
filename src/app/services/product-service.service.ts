import { Injectable } from '@angular/core';

import { Observable, throwError, observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Products } from '../components/products/products';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  observe:Observable<Products>;
  cart:Array<Products>  = [];
  totalCost:number = 0;
  noOfItems:number = 0;

  constructor(private http:HttpClient) { }

  getProducts(mobileUrl):Observable<Products[]>{
    return this.http.get<Products[]>(mobileUrl).pipe(
      catchError(this.handleError));
  }

  // getProductById(id):Observable<Products>{
  //   //this.observe  = new Observable<Products>();
  // this.observe = this.http.get<Products>(this.mobileUrl).pipe(
  //   map((products) => products.filter(product => product.productId == id)[0])
  // );
  //   return this.observe;
  // }

  getProductById(id: number, url): Observable<Products> {
    return this.getProducts(url).pipe(
        map(products => products.filter(product => product.productId === id)[0]));
}

  private handleError(err:HttpErrorResponse) {
    let errMsg:string='';
    if (err.error instanceof Error) {
       // A client-side or network error occurred. Handle it accordingly.
       console.log('An error occurred:', err.error.message);
        errMsg=err.error.message;} 
       else {
       // The backend returned an unsuccessful response code.
       // The response body may contain clues as to what went wrong,
       console.log(JSON.stringify(err));
       console.log(`Backend returned code ${err.status}`);
          errMsg=err.error.status;
     }
        return throwError(errMsg); 
  }

  addToCart(product){
    console.log("service ");
      //product.quantity = 
      //this.cart.push(product);
      if(this.cart.filter(p => product.productId== p.productId).length==0){
        console.log("if");
        product.quantity = 1;
        this.cart.push(product);
      }
      else{
      //  console.log("else "+JSON.stringify(this.cart.filter(p => product.productId== p.productId)));
        this.cart.filter(p => product.productId== p.productId).map(p => {
          p.quantity+=1
        //  console.log("..."+JSON.stringify(p));
        });
      }
      this.totalCost+=product.price;
      this.noOfItems+=1;
  }

  deleteItem(product){
    if(product.quantity>1){
      this.cart.filter(p => product.productId== p.productId).map(p => {
        p.quantity-=1
      });
    }
    else{
      this.cart = this.cart.filter(p => p.productId!= product.productId);
    }
    this.totalCost-= product.price;
    this.noOfItems-=1;
  }

  calculateTotal(){
    this.totalCost = this.cart.reduce((total,p) => (total+(p.quantity* p.price)),0);
    this.noOfItems = this.cart.reduce((total,p)=> total+p.quantity,0);
  }
}
