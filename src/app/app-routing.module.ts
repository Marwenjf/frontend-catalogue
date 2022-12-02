import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { CustomersComponent } from './customers/customers.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LoginComponent } from './login/login.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",component:LoginComponent},
  {path:"shop",component:ShopComponent,
    canActivate: [AuthenticationGuard],
    children:[
    {path:"products",component:ProductsComponent},
    {path:"new-product",component:NewProductComponent},
    {path:"edit-product/:id",component:EditProductComponent},
    {path:"customers",component:CustomersComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
