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
import { SideNavBarComponent } from '../side-nav-bar/side-nav-bar.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ImportModalComponent } from '../import-modal/import-modal.component';
import { jsPDF } from "jspdf";
import autoTablePlugin from 'jspdf-autotable'
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

  
  constructor(public dialog: MatDialog, private clientService: ClientService,  private router: Router, private route: ActivatedRoute) {
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
  showdashboardButtons = false;
  handleChildEvent(event: any) {
    console.log('Evento recibido del hijo:', event);
  }
//Se inicializa el componente cliente
  ngOnInit(): void {
   this.loadClients(); 
   this.route.queryParams.subscribe(params => {
      this.showdashboardButtons = params['showButtons'] === 'true';
    });
}

// abrimos la modal para crear un nuevo cliente
openCreateClientModal() {
  const dialogRef = this.dialog.open(ClientDetailComponent);
}
openModalImportClients(){
  const dialogRef = this.dialog.open(ImportModalComponent, {
    data: 'clients',
  });
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
generatePDF() {
     alert('Generando PDF...');
    const doc = new jsPDF();

  // Título
    doc.setFontSize(18);
    doc.text('Reporte de Clientes', 14, 20);
  
    // Fecha
    doc.setFontSize(11);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 30);
  
    // Definir columnas de la tabla
    const tableColumn = [
      "CVE",	"Nombre",	"Apellido Paterno",	"Apellido Materno",	"Telefono",	"Correo",	"Fecha Creacion","Estatus"
    ];

  // Crear filas de la tabla
  const tableRows: any[] = [];

  this.filterClientsList.forEach(item => {
    const rowData = [
      item.id,
      item.name,
      item.father_lastname,
      item.mother_lastname,
      item.telephone1,
      item.email1,
      item.created_at,
      item.status_desc
    ];
    tableRows.push(rowData);
  });

  // Crear tabla en el PDF
  autoTablePlugin(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 40,
    // theme: 'striped',
    //headStyles: { fillColor: [0, 102, 204] }, // Azul encabezado
    //styles: { fontSize: 10 }
  });

  // Guardar PDF
  doc.save("reporte-transacciones.pdf");
}
generateAndPrintPDF() {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Reporte de Transacciones', 14, 20);

  const tableColumn = [
      "CVE",	"Nombre",	"Apellido Paterno",	"Apellido Materno",	"Telefono",	"Correo",	"Fecha Creacion","Estatus"
    ];
  const tableRows: any[] = [];

  this.filterClientsList.forEach(item => {
    const rowData = [
      item.id,
      item.name,
      item.father_lastname,
      item.mother_lastname,
      item.telephone1,
      item.email1,
      item.created_at,
      item.status_desc
    ];
    tableRows.push(rowData);
  });

  autoTablePlugin(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    theme: 'striped'
  });

  // Abre el PDF en una nueva pestaña y lo manda a imprimir
  const pdfBlob = doc.output('bloburl');
  const printWindow = window.open(pdfBlob);
  printWindow?.print();
}
deleteClient(id:number) {
  
  this.clientService.deleteClient(id).subscribe(console.log);
  alert("Cliente borrado exitosamente");
  this.loadClients();
}
loadClients() {
    this.clientService.getClients().subscribe({
   next: (data: any) => {
      // console.log('DATA COMPLETA:', data); // 👈 Mira esto en la consola del navegador

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
