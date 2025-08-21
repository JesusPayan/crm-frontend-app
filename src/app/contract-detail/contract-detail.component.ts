import { Component,Inject,Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ClientSummary } from '../models/client_summary';
import { ProductSummary } from '../models/product_summary';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '../services/client.service';
import { ContractService } from '../services/contract.service';
import { ProductService } from '../services/product.service';
import { response } from 'express';
import { Client } from '../models/client';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-contract-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './contract-detail.component.html',
  styleUrl: './contract-detail.component.css'
})
export class ContractDetailComponent {
  //declaracion de variables
  clientSumaryList: ClientSummary[] = [];
  productSummaryList: ProductSummary[] = [];
  response: any;
  cadenas: string[] = ['Manzana', 'Plátano', 'Naranja', 'Uva'];
  contractType: string[] = ['Perfil', 'Cuenta completa'];
  contractDuration:string [] = 
  ['Mensual',
  'Bimestral',
  'Trimestral',
  'Semestral',
  'Anual'];
  selectedClient: ClientSummary = {} as ClientSummary;
  clientSummary: ClientSummary = {
    id: 0,
    cve_internal: '',
    name: '',
    father_lastname: '',
    mother_lastname: '',
    email1: '',
    telephone1: ''
  };
  selectedProduct: ProductSummary = {} as ProductSummary;
  selectedContractType: string = '';
  selectedContractDuration: string = '';
  loggedUser = 'admin'; 
  receipClient: string = ''; 
  client: boolean = false;
  clientID: number = 0
  private router = Inject(Router);
  constructor(private dialog: MatDialog, private clientService: ClientService,private contractService: ContractService, private productService: ProductService, @Inject(MAT_DIALOG_DATA) public data: Client) {
    if (data) {
      this.clientSummary = data;
      this.receipClient = this.clientSummary.name + ' ' + this.clientSummary.father_lastname + ' ' + this.clientSummary.mother_lastname

      this.client = true;
      this.clientID = this.clientSummary.id
    }
  }

  ngOnInit() {
    // Inicialización de la variable
    if (this.clientSumaryList.length === 0) {
      this.clientService.getClientsSummary().subscribe((data) => {
      this.clientSumaryList = data;
      this.response = data;
      console.log(this.response);
    });
    }
    if (this.productSummaryList.length === 0) {
      this.productService.getProductsSummary().subscribe((data) => {
      this.productSummaryList = data;
      this.response = data;
      console.log(this.response);
    });
    }
    

  }
  onSubmit() {

    const newContract = new FormData();
    console.log(this.selectedClient);
    console.log(this.selectedProduct);
    console.log(this.selectedContractType);
    console.log(this.selectedContractDuration);
    //Asignamos los valores a los campos del formulario
    if (this.client) {
      newContract.append('client_id', this.clientID.toString());
    }else{
      newContract.append('client_id', this.selectedClient.toString());
    }
    // newContract.append('client_id', this.selectedClient.toString());
    newContract.append('product_name', this.selectedProduct.toString());
    newContract.append('contract_type', this.selectedContractType.toString());
    newContract.append('contract_duration', this.selectedContractDuration.toString());
    newContract.append('created_by', this.loggedUser);
    // Enviamos el formulario al servicio
    this.contractService.createNewContract(newContract).subscribe((data) => {
      this.response = data;
      console.log(this.response);

      alert(this.response.message);
      this.closeModal();
      
    });
    
    
  }
closeModal() {
  // Lógica para cerrar el modal
  console.log('Modal cerrado');
  this.dialog.closeAll();
}
}
