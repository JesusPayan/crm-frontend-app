import { Component,Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ClientSummary } from '../models/client_summary';
import { ProductSummary } from '../models/product_summary';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../services/client.service';
import { ContractService } from '../services/contract.service';
import { ProductService } from '../services/product.service';
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

  constructor(private dialog: MatDialog, private clientService: ClientService,private contractService: ContractService, private productService: ProductService) {}

  ngOnInit() {
    // Inicialización de la variable
    this.clientService.getClientsSummary().subscribe((data) => {
      this.clientSumaryList = data;
      this.response = data;
      console.log(this.response);
    })
    this.productService.getProductsSummary().subscribe((data) => {
      this.productSummaryList = data;
      this.response = data;
      console.log(this.response);
    })

  }
  onSubmit() {
    console.log('Form submitted!');
  }
closeModal() {
  // Lógica para cerrar el modal
  console.log('Modal cerrado');
  this.dialog.closeAll();
}
}
