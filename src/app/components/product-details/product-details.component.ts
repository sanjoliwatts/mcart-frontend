import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { switchMap } from 'rxjs/operators';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Products } from '../products/products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product:Products;
  subject:any;
  mobileUrl = "./assets/products/mobiles.json";
  tabletUrl = "./assets/products/tablets.json";

  constructor(private productService: ProductServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.subject =  this.route.paramMap.pipe(switchMap((params: ParamMap) =>
      this.productService.getProductById(+params.get('id'),this.mobileUrl))).subscribe(
        product => {
        this.product = product;
        if(this.product == null){
          this.route.paramMap.pipe(switchMap((params: ParamMap) =>
           this.productService.getProductById(+params.get('id'),this.tabletUrl))).subscribe(
            product =>
              this.product = product
           );
        }
        });

        //The below lines of code also gives the same output
        /* const id = +this.route.snapshot.paramMap.get('id');
          this.productService.getProductById(id)
          .subscribe((product:Product) => this.product = product);*/
      }

  ngOnDestroy() {
    this.subject.unsubscribe();
  }
  goBack() {
    window.history.back();
  }
}


