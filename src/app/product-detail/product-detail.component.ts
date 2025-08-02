import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule,NgForm,NgModel  } from '@angular/forms';
import { Product } from '../models/product';
// Ensure that '../models/product' exports Product as a class, not just a type/interface.
// If Product is only a type/interface, change its definition to a class like:
// export class Product { /* properties here */ }

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  product: Product = {
    id : 0,
    cve_internal : '',
    description : '',
    investment : 0,
    client_profile_price : 0,
    client_complete_price : 0,
    product_profit_profile : 0,
    product_profit_per_complete : 0,
    image : '',
    total_profiles : 0,  
    active_profiles : 0,
    available_profiles : 0,
    status : 0,
    status_desc : '',
    created_at : new Date(),
    created_by : '',
    updated_at : new Date(),
    updated_by : '',
    access_identifier : '',
    access_password : '',
    expiration_date : new Date()

  };
streamingProducts: any[] = [
  
  {name:'Netlix', value: 'Netlix'},
  {name:'Hulu', value: 'Hulu'  },
  {name:'Prime Video', value: 'Prime Video'},
  {name:'Disney+'},
  {name:'Youtube'},
  {name:'Vix'},
  {name:'Paramount+'},
  {name:'HBO Max'},
  {name:'Agrega tu plataforma',value:'agregar'}



]
  constructor(public dialog: MatDialog) { }
  closeModal() {
    const dialogRef = this.dialog.closeAll();
  }
  createProduct() {
    this.product.status = 1;
    alert('hola');
    const dialogRef = this.dialog.closeAll();
  }
}
