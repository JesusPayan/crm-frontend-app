import { Component  , OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatDialog , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule,NgForm,NgModel } from '@angular/forms';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { response } from 'express';

import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  providers: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  response: any;
  editMode = false;
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
    expiration_date : new Date(),
    comments : ''
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
loggedUser = 'admin';
  // productForm: FormGroup;
  selectedFile: File | null = null;
  // constructor(public dialog: MatDialog,private productService: ProductService ) { }
  constructor(private fb: FormBuilder, private productService: ProductService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: Product ) {
    if (data) {
      this.product = data;
      this.editMode = true;
    }
    // this.productForm = this.fb.group({
    //   description: ['description', Validators.required],
    //   price: ['', Validators.required],
    // });



  } 
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }
  onSubmit(): void {
    const formData = new FormData();
    if (!this.selectedFile) {
      alert("Debe seleccionar una imagen");
    }
    else{
      formData.append('image', this.selectedFile, this.selectedFile.name);
      formData.append('description', this.product.description);
      formData.append('investment', this.product.investment.toString());
      formData.append('client_profile_price', this.product.client_profile_price.toString());
      formData.append('client_complete_price', this.product.client_complete_price.toString());
      formData.append('product_profit_profile', this.product.product_profit_profile.toString());
      formData.append('product_profit_per_complete', this.product.product_profit_per_complete.toString());
      formData.append('total_profiles', this.product.total_profiles.toString());
      formData.append('active_profiles', this.product.active_profiles.toString());
      formData.append('available_profiles', this.product.available_profiles.toString());
      formData.append('status', this.product.status.toString());
      formData.append('status_desc', this.product.status_desc);
      formData.append('created_at', this.product.created_at.toString());
      formData.append('created_by', this.product.created_by);
      formData.append('updated_at', this.product.updated_at.toString());
      formData.append('updated_by', this.loggedUser);
      formData.append('access_identifier', this.product.access_identifier);
      formData.append('access_password', this.product.access_password);
      formData.append('expiration_date', this.product.expiration_date.toString());
      formData.append('cve_internal', this.product.cve_internal);
    }

    // Enviar al backend
    this.productService.createNewProduct(formData).subscribe({
      next: (res) => {
    
        console.log('Producto guardado exitosamente:', res);
        alert(res.message);
        this.selectedFile = null;
        this.dialog.closeAll();
      },
      error: (err) => console.error('Error al guardar producto:', err)
    });
  }

  updateProduct(): void {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
      }
      formData.append('id', this.product.id.toString());
      formData.append('description', this.product.description);
      formData.append('investment', this.product.investment.toString());
      formData.append('client_profile_price', this.product.client_profile_price.toString());
      formData.append('client_complete_price', this.product.client_complete_price.toString());
      formData.append('product_profit_profile', this.product.product_profit_profile.toString());
      formData.append('product_profit_per_complete', this.product.product_profit_per_complete.toString());
      formData.append('total_profiles', this.product.total_profiles.toString());
      formData.append('active_profiles', this.product.active_profiles.toString());
      formData.append('available_profiles', this.product.available_profiles.toString());
      formData.append('status', this.product.status.toString());
      formData.append('status_desc', this.product.status_desc);
      formData.append('updated_by', this.loggedUser);
      formData.append('access_identifier', this.product.access_identifier);
      formData.append('access_password', this.product.access_password);
      formData.append('expiration_date', this.product.expiration_date.toString());

    // Enviar al backend
    this.productService.updateProduct(formData).subscribe({
      next: (res) => {
        console.log('Producto actualizado exitosamente:', res);
        alert(res.message);
        this.selectedFile = null;
        this.dialog.closeAll();
      },
      error: (err) => console.error('Error al actualizar producto:', err)
    });
  }
  
  
      
  
  closeModal() {
    const dialogRef = this.dialog.closeAll();
  }

 
}
