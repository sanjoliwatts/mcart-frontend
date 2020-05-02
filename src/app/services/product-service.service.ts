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
      this.cart.push(product);
      this.totalCost+=product.price;
  }
}
