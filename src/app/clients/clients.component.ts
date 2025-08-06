import { Component } from '@angular/core';
import { Client } from '../models/client';
import { ClientService } from '../services/client.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule,NgModel,FormControl,ReactiveFormsModule, } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ClientDetailComponent } from '../client-detail/client-detail.component';
@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})



export class ClientsComponent {

    constructor(public dialog: MatDialog, private clientService: ClientService) {
    this.clientService.getClients().subscribe(console.log);
  }
//Inicializamos las variables
  clientList: Client[] = [];
  filterClientsList: Client[] = [];


  //construimos el componente

  totalClients: number = 0;
   searchText: string = '';
   response: any;
//Se inicializa el componente cliente
  ngOnInit(): void {
   this.loadClients(); 
}

// abrimos la modal para crear un nuevo cliente
openCreateClientModal() {
  const dialogRef = this.dialog.open(ClientDetailComponent);

}
//flitramos los clientes
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
      // Si tiene message
      if (data.message) {
        // alert(data.message);
      }
    },
    error: (error: any) => {
      console.error('ERROR AL CARGAR CLIENTES:', error);
    }
  });
}
}
