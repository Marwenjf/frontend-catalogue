import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! : Array<Product>;//Product[]
  constructor() {
    this.products = [
      {id:UUID.UUID(), name:"Computer",price:6500,promotion:false},
      {id:UUID.UUID(), name:"Printer",price:1200,promotion:true},
      {id:UUID.UUID(), name:"Smart phone",price:1400,promotion:false}
    ];

    for (let index = 0; index < 10; index++) {
      this.products.push({id:UUID.UUID(), name:"Computer",price:6500,promotion:false});
      this.products.push({id:UUID.UUID(), name:"Printer",price:1200,promotion:true});
      this.products.push({id:UUID.UUID(), name:"Smart phone",price:1400,promotion:false});
    }
  }

  public getAllProducts():Observable<Product[]>{
    //let rnd  = Math.random();
    //if(rnd<0.5) return throwError(()=> new Error("Internet connexion error"));
    return of(this.products);
  }

  public getPageProducts(page:number,size:number):Observable<PageProduct>{
    let index = page*size;
    let totalPages = ~~(this.products.length/size);
    if(this.products.length % size != 0)
    totalPages++;
    let pageProducts =  this.products.slice(index,index+size);
    return of({page:page,size:size,totalPages:totalPages,products:pageProducts});
  }

  public deleteProduct(id:string):Observable<boolean>{
    this.products = this.products.filter(p=>p.id!=id);
    return of(true);
  }

  public setPromotion(id:string):Observable<boolean>{
    let product = this.products.find(p=>p.id==id);
    if (product!= undefined) {
      product.promotion= !product.promotion;
      return of(product.promotion);
    }
    else return throwError(()=>new Error("Product not found"));
  }

  public searchProducts(keyword:string):Observable<Product[]>{
    let products = this.products.filter(p=>p.name.includes(keyword));
    return of(products);
  }

  public searchPageProducts(keyword:string,page:number,size:number):Observable<PageProduct>{
    let result = this.products.filter(p=>p.name.includes(keyword));
    let index = page*size;
    let totalPages = ~~(result.length/size);
    if(result.length % size != 0)
    totalPages++;
    let pageProducts =  result.slice(index,index+size);

    return of({page:page,size:size,totalPages:totalPages,products:pageProducts});
  }

  public addNewProduct(product: Product):Observable<Product>{
    product.id = UUID.UUID();
    this.products.push(product);
    return of(product);
  }

  public getProduct(id:string):Observable<Product>{
    let product = this.products.find(p=>p.id==id);
    if(product == undefined) return throwError(()=> new Error('Product not found'));
    return of(product);
  }

  getErrorMessage(fieldName: string,errors:ValidationErrors):string{
    if (errors['required']) {
     return fieldName+' is Required';
    } else if (errors['minlength']) {
     return fieldName+' should have at least '+errors['minlength']['requiredLength']+' Characters';
    }
    else if (errors['min']) {
     return fieldName+' should have min value '+errors['min']['min'];
    }
    else return '';
   }

   public updateProduct(product: Product):Observable<Product>{
    this.products=this.products.map(p=>(p.id==product.id)?product:p);
    return of(product);
   }
}
