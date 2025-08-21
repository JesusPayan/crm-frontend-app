import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractService } from '../services/contract.service';
import { MatDialog } from '@angular/material/dialog';
import { Contract } from '../models/contract';
import { Header } from '../models/header';
import { response, Router } from 'express';
import { FormsModule,NgModel,FormControl,ReactiveFormsModule, } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {ContractSummary} from '../models/contractSummary';
import * as XLSX from 'xlsx';
import { ContractDetailComponent } from '../contract-detail/contract-detail.component';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from "jspdf";
import autoTablePlugin from 'jspdf-autotable'
@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.css'
})

export class ContractComponent {
  //Declaramos variables
  searchText: string = '';
  filteredContracts: ContractSummary[] = [];
  contractList: ContractSummary[] = [];
  totalContracts: number = 0;
  nextToExpire: number = 0;
  available: number = 0;
  contracted: number = 0;
  response: any;
  telephone: string = '';
  message: string = '';
  loggedUser = 'Admin';
  showdashboardButtons = false;
  //Inicializamos el componente e inyectamos dependencias
  constructor(public dialog: MatDialog,public contractService: ContractService, private route: ActivatedRoute) { }
   headerList: Header[] = [
    {title: this.available, description: 'Disponibles',image: 'https://dummyimage.com/600x400/000/fff', bgColor: 'bg-green-500', textColor: 'text-green-500'},
    {title: this.nextToExpire, description: 'Proximos a vencer',image: 'https://dummyimage.com/600x400/000/fff', bgColor: 'bg-red-500', textColor: 'text-red-900'},
    {title: this.contracted, description: 'Contratados',image: 'https://dummyimage.com/600x400/000/fff', bgColor: 'bg-blue-500', textColor: 'text-blue-500'},
    {title: this.totalContracts, description: 'Total productos',image: 'https://dummyimage.com/600x400/000/fff', bgColor: 'bg-orange-500',  textColor: 'text-stone-900'},
  ];
  
  ngOnInit(): void {
      this.contractService.updateDayleft().subscribe(console.log);
      this.getContracts();
      this.populateHeaders();
      this.route.queryParams.subscribe(params => {
        this.showdashboardButtons = params['showButtons'] === 'true';
      });
  }

  filterContracts() {
    const term = this.searchText.toLowerCase().trim();
    if (!term) {
      this.filteredContracts = this.contractList;
      return;
    }
    this.filteredContracts = this.contractList.filter(contract =>
      contract.name.toString().includes(term) ||
      contract.father_lastname.toString().includes(term) ||
      contract.mother_lastname.toString().includes(term) ||
      contract.contract_type_desc.toLowerCase().includes(term)||
      contract.Description.toLowerCase().includes(term)||
      contract.status_desc.toLowerCase().includes(term)||
      contract.access_identifier.toLowerCase().includes(term)
      
    );
   
  }  
  populateHeaders() {
    // this.available = this.contractList.filter(contract => contract.status_desc === 'Disponible').length;
    // this.nextToExpire = this.contractList.filter(contract => contract.status_desc === 'Proximos a vencer').length;
    // this.contracted = this.contractList.filter(contract => contract.status_desc === 'Contratado').length;
    // for(let i = 0; i < this.contractList.length; i++) {
    //   alert(this.contractList[i].status_desc);
    // }
    
    this.totalContracts = this.contractList.length;
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
        "ID",	"Nombre",	"Apellido Paterno",	"Apellido Materno",	"Producto",	"Correo",	"Contraseña",	"Estatus",	"Fecha de Inicio",	"Fecha de Fin",	"Dias Restantes",	"Precio",	"Tipo"
      ];
    const tableRows: any[] = [];
  
    this.filteredContracts.forEach(item => {
      const rowData = [
        item.id,
        item.name,
        item.father_lastname,
        item.mother_lastname,
        item.Description,
        item.access_identifier,
        item.access_password,
        item.status_desc,
        item.start_date,
        item.end_date,
        item.days_left,
        item.total_price,
        item.contract_type_desc
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
    doc.text('Reporte de contratos', 14, 20);
  
    const tableColumn = [
        "ID",	"Nombre",	"Apellido Paterno",	"Apellido Materno",	"Producto",	"Correo",	"Contraseña",	"Estatus",	"Fecha de Inicio",	"Fecha de Fin",	"Dias Restantes",	"Precio",	"Tipo"
      ];
    const tableRows: any[] = [];
  
    this.filteredContracts.forEach(item => {
      const rowData = [
        item.id,
        item.name,
        item.father_lastname,
        item.mother_lastname,
        item.Description,
        item.access_identifier,
        item.access_password,
        item.status_desc,
        item.start_date,
        item.end_date,
        item.days_left,
        item.total_price,
        item.contract_type_desc
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
  getContracts(): void {
    this.contractService.getContracts_summary().subscribe(
              {next: (data: any) => {
                // console.log(data);
                this.response = data;
                this.contractList = this.response;
                this.filteredContracts = this.contractList;
                this.totalContracts = this.contractList.length;
                for(let i = 0; i < this.filteredContracts.length; i++) {
                    if (this.contractList[i].status_desc === 'Activo') {
                      this.available = this.available + 1;
                    }
                    if (this.contractList[i].status_desc === 'Proximo a vencer') {
                      this.nextToExpire = this.nextToExpire + 1;
                    }
             
              }
               console.info("Contratos cargados correctamente");
              },
              error: (error: any) =>{
                console.error(error);
              }
            });
    
  }
  exportContracts(): void {
     const worksheet = XLSX.utils.json_to_sheet(this.filteredContracts);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');
      XLSX.writeFile(workbook, 'clientes.xlsx');
  }
  openCreateContractModal(): void {
    const dialogRef = this.dialog.open(ContractDetailComponent);
    
  }

 
  deleteContract(id: number): void {
    this.contractService.deleteContract(id).subscribe({next: (data: any) => {  
              console.log(data);
              alert(data.message)
              this.getContracts();
            },
            error: (error: any) =>{
              console.error(error);
            }
          });
          this.getContracts();
  }
  renovateContract(id: number): void {
    // this.contractService.renovateContract(id).subscribe(console.log);  
    const formData = new FormData();
    formData.append('renovate_by',this.loggedUser);
    this.contractService.renovateContract(id,this.loggedUser).subscribe({next: (data: any) => {  
              console.log(data);
              alert(data.message)
              this.getContracts();
            },
            error: (error: any) =>{
              console.error(error);
            }
          });
          this.getContracts();
          
  }
sendReminder(telephone: string, name: string, day_left: number, productContrated: string): void {
  
  this.message = "Hola "+ name + " te recordamos que tu sevicio de "+ productContrated + "  expira en " + day_left + " dias";
  // const encodedMessage = encodeURIComponent(this.message);
  const url = `https://api.whatsapp.com/send?phone=${telephone}&text=${encodeURIComponent(this.message)}`;
  window.open(url, '_blank'); // Abre en nueva pestaña
  alert('Se envio un recordatorio al cliente');
}
shareContract(name:string,phone:string,email:string,password:string,starDate:Date,endDate:Date, productContrated: string): void {
  this.message = "Hola, "+ name + " gracias por contratar tu servicio.\nTe compartimos los datos de acceso de que tu sevicio de "+ productContrated + "\n- Correo: " + email + "\n- Contraseña: " + password + " \n- Fecha inicio: " + starDate + "\n- Fecha fin: " + endDate + ".";
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(this.message)}`;
  window.open(url, '_blank');
  alert("Se compartio el contrato con el cliente");
}
}
