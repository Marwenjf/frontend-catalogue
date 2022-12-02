import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId!:string;
  product!: Product;
  editProductFormGroup!: FormGroup;
  errorMessage! : string ;

  constructor(private route:ActivatedRoute,
    private fb:FormBuilder,
    public productService:ProductService) {
      
    }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    if(this.productId){
    this.productService.getProduct(this.productId).subscribe({
      next:(data)=>{
        this.editProductFormGroup = this.fb.group({
          id:this.fb.control(data.id),
          name:this.fb.control(data.name),
          price:this.fb.control(data.price),
          promotion:this.fb.control(data.promotion)
        });
      },
     error:(err)=>{
      console.log(err);
      this.errorMessage=err;
     }
    });
  }
}

  handleUpdateProduct(){
   this.productService.updateProduct(this.editProductFormGroup.value).subscribe({
    next:data=>{
      alert("Product updated successfully");
    },
    error:err=>{
      console.log(err);
    }
   });
  }

}
