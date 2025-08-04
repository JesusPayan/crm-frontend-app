import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { Header } from '../models/header';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../services/product.service';
import { response } from 'express';
import { FormsModule,NgModel,FormControl,ReactiveFormsModule, } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { allowedNodeEnvironmentFlags } from 'process';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  searchControl = new FormControl('');
  constructor(public dialog: MatDialog, private router: Router, private productService: ProductService) {
    this.productService.getProducts().subscribe(console.log);
  }
  filteredProducts:Product[] = [];

  productList:Product[] = [];

  available: number = 0;
  nextToExpire = 2;
  contracted  = 0;
  total_products = this.productList.length;
  response: any;
  searchText: string = '';
 
  //Poblamos los encabezados de la app
  populateHeaders() {
    
    for (let i = 0; i < this.productList.length; i++) {
      this.contracted = this.contracted + this.productList[i].active_profiles
      this.available = this.available + this.productList[i].available_profiles
      if (this.productList[i].expiration_date < new Date()) {
        this.nextToExpire = this.nextToExpire + this.productList[i].available_profiles
      }
    }

  }
  // #filtramos los productos por cve interna o descripcion

  filterProducts() {
    const term = this.searchText.toLowerCase().trim();
     if (!term) {
      this.filteredProducts = this.productList;
      return;
    }
    this.filteredProducts = this.productList.filter(product =>
    product.cve_internal.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term)
  );
  
  }
  

  
  ngOnInit(): void {

    this.productService.getProducts().subscribe(
            {next: (data: any) => {
              // console.log(data);
              this.response = data;
              this.productList = this.response.data;
              this.filteredProducts = this.productList;
              this.total_products = this.productList.length;
              this.populateHeaders();
            },
            error: (error: any) =>{
              console.error(error);
            }
          });
  }  

   headerList: Header[] = [
    {title: this.available, description: 'Disponibles',image: 'https://dummyimage.com/600x400/000/fff', bgColor: 'bg-green-500', textColor: 'text-green-500'},
    {title: this.nextToExpire, description: 'Proximos a vencer',image: 'https://dummyimage.com/600x400/000/fff', bgColor: 'bg-red-500', textColor: 'text-red-900'},
    {title: this.contracted, description: 'Contratados',image: 'https://dummyimage.com/600x400/000/fff', bgColor: 'bg-blue-500', textColor: 'text-blue-500'},
    {title: this.total_products, description: 'Total productos',image: 'https://dummyimage.com/600x400/000/fff', bgColor: 'bg-orange-500',  textColor: 'text-stone-900'},
  ];
  openCreateProductModal() {
    const dialogRef = this.dialog.open(ProductDetailComponent);
  }
  deleteProduct(id: number) {
    alert('Borrando producto.....'+ id);
    this.productService.deleteProduct(id).subscribe(
      {next: (data: any) => {
              console.log(data);
              this.response = data;
              alert(this.response.message);
            },
            error: (error: any) =>{
              console.error(error);
            }
          });
          this.ngOnInit();
  }
  exportProducts() {
    alert('Ecportando productos.....');
  }
}
