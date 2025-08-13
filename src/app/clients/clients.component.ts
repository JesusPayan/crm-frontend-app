import { Component, output, EventEmitter, Input, Output, Inject,NgModule,Injectable } from '@angular/core';
import { Client } from '../models/client';
import { ClientService } from '../services/client.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule,NgModel,FormControl,ReactiveFormsModule, } from '@angular/forms';
import * as XLSX from 'xlsx';
import { SharedModule } from '../shared/shared.module';
import { ClientDetailComponent } from '../client-detail/client-detail.component';
import { ClientSummary } from '../models/client_summary';
import { ContractDetailComponent } from '../contract-detail/contract-detail.component';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})



export class ClientsComponent {
  @Output() clientEvent = new EventEmitter<Client>();
  constructor(public dialog: MatDialog, private clientService: ClientService) {
    this.clientService.getClients().subscribe(console.log);
    
  }
//Declaramos variables
  clientList: Client[] = [];
  filterClientsList: Client[] = [];
  totalClients: number = 0;
  searchText: string = '';
  response: any;
  clientSumaryList: ClientSummary[] = [];
  statusColor = '';
  
  handleChildEvent(event: any) {
    console.log('Evento recibido del hijo:', event);
  }
//Se inicializa el componente cliente
  ngOnInit(): void {
   this.loadClients(); 

}

// abrimos la modal para crear un nuevo cliente
openCreateClientModal() {
  const dialogRef = this.dialog.open(ClientDetailComponent);
}
//flitramos los clientes por nombre, apellido, email, telefono  
filterClients() {
    const term = (this.searchText || '').toLowerCase().trim();

  if (!term) {
    this.filterClientsList = this.clientList;
    return;
  }

  this.filterClientsList = this.clientList.filter(client =>
    (client.cve_internal || '').toLowerCase().includes(term) ||
    (client.name || '').toLowerCase().includes(term) ||
    (client.father_lastname || '').toLowerCase().includes(term) ||
    (client.mother_lastname || '').toLowerCase().includes(term) ||
    (client.email1 || '').toLowerCase().includes(term) ||
    (client.telephone1 || '').toLowerCase().includes(term) ||
    (client.status_desc || '').toLowerCase().includes(term)
  );
}
//Exportamos los clientes a excel o csv }
exportClients() {
  const worksheet = XLSX.utils.json_to_sheet(this.clientList);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');
  XLSX.writeFile(workbook, 'clientes.xlsx');
}
deleteClient(id:number) {
  
  this.clientService.deleteClient(id).subscribe(console.log);
  alert("Cliente borrado exitosamente");
  this.loadClients();
}
loadClients() {
    this.clientService.getClients().subscribe({
   next: (data: any) => {
      console.log('DATA COMPLETA:', data); // 👈 Mira esto en la consola del navegador

      // Ajusta según la estructura real que te devuelve el backend
      this.clientList = data.data || data; // Usa data.data si existe, si no, usa data directo

      // Actualiza total de clientes
      this.totalClients = this.clientList.length;
      this.filterClientsList = this.clientList;
  

      
    },
    error: (error: any) => {
      console.error('ERROR AL CARGAR CLIENTES:', error);
    }
  });
}

openUpdateClientModal(client: Client) {
  const dialogRef = this.dialog.open(ClientDetailComponent, {
    data: client,
  });
}
//asignamos un contrato desde la vista de clientes
assignContract(client: Client) {
  this.clientEvent.emit(client);
  const dialogRef = this.dialog.open(ContractDetailComponent, {
    data: client,
  })
}
}
