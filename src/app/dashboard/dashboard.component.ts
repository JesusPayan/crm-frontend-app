
import { Component, output, EventEmitter, Input, Output, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule,NgForm,NgModel } from '@angular/forms';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';
import { response } from 'express';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";
import autoTablePlugin from 'jspdf-autotable';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  response: any;
  ngOnInit(): void {
    this.getTransactions();
    // this.calculateBalance();
  }
  constructor(private transactionService: TransactionService) { }
  searchText: string = '';
  transactionsList: Transaction[] = [];
  filterTransactionsList: Transaction[] = [];
  tableHeaders: string[] = ['Tipo', 'Tipo de transaccion', 'Fecha', 'Estatus', 'Monto'];
  totalTransactions: number = 0;
  totalIngress: number = 0;
  totalEgress: number = 0;
  totalBalance: number = 0;
  
  
  

   generatePDF() {
     alert('Generando PDF...');
    const doc = new jsPDF();

  // Título
    doc.setFontSize(18);
    doc.text('Reporte de Transacciones', 14, 20);
  
    // Fecha
    doc.setFontSize(11);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 30);
  
    // Definir columnas de la tabla
    const tableColumn = [
      "ID",
      "Tipo Transacción",
      "Fecha",
      "Descripción",
      "Monto",
      "Tipo Contrato"
    ];

  // Crear filas de la tabla
  const tableRows: any[] = [];

  this.filterTransactionsList.forEach(item => {
    const rowData = [
      item.id,
      item.Transaction_type_desc,
      item.Transaction_date,
      item.Transaction_description,
      item.Transaction_amount,
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
  doc.text('Reporte de Transacciones', 14, 20);

  const tableColumn = ["ID", "Tipo Transacción", "Fecha", "Descripción", "Monto", "Tipo Contrato"];
  const tableRows: any[] = [];

  this.filterTransactionsList.forEach(item => {
    tableRows.push([
      item.id,
      item.Transaction_type_desc,
      item.Transaction_date,
      item.Transaction_description,
      item.Transaction_amount,
      item.contract_type_desc
    ]);
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
   
  getTransactions(): void {
    
    this.totalEgress = 0;
    this.totalIngress = 0;
    
    this.transactionService.getTransactions().subscribe(
            {next: (data: any) => {
              
              console.log(data.message);
              this.response = data;
              this.transactionsList = this.response.data;
              this.filterTransactionsList = this.transactionsList;
              this.filterTransactionsList.forEach(transaction => {
                if (transaction.Transaction_type_desc === 'Venta') {
                  this.totalIngress += Number(transaction.Transaction_amount)
                  
                } else if (transaction.Transaction_type_desc === 'Compra') {
                  
                  this.totalEgress += Number(transaction.Transaction_amount)
                }
              })
              console.log(this.totalEgress);
              console.log(this.totalIngress);
              this.totalBalance = this.totalIngress - this.totalEgress;
              this.totalBalance = Math.round(this.totalBalance * 100) / 100;
              this.totalTransactions = this.transactionsList.length;
              console.log(this.totalBalance);
            },
            error: (error: any) =>{
              console.error(error);
            }
          });
  }
filterTransaction(){
  this.filterTransactionsList = this.transactionsList.filter(transaction =>
    (transaction.Transaction_type_desc || '').toLowerCase().includes(this.searchText) ||
    (transaction.Transaction_description || '').toLowerCase().includes(this.searchText) ||
    (transaction.contract_type_desc || '').toLowerCase().includes(this.searchText)
  );
}

}


