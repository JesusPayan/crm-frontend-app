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
  //Inicializamos el componente e inyectamos dependencias
  constructor(public dialog: MatDialog,public contractService: ContractService) { }
   headerList: Header[] = [
    {title: this.available, description: 'Disponibles',image: 'https://dummyimage.com/600x400/000/fff', bgColor: 'bg-green-500', textColor: 'text-green-500'},
    {title: this.nextToExpire, description: 'Proximos a vencer',image: 'https://dummyimage.com/600x400/000/fff', bgColor: 'bg-red-500', textColor: 'text-red-900'},
    {title: this.contracted, description: 'Contratados',image: 'https://dummyimage.com/600x400/000/fff', bgColor: 'bg-blue-500', textColor: 'text-blue-500'},
    {title: this.totalContracts, description: 'Total productos',image: 'https://dummyimage.com/600x400/000/fff', bgColor: 'bg-orange-500',  textColor: 'text-stone-900'},
  ];
  ngOnInit(): void {
    this.contractService.getContracts_summary().subscribe(
            {next: (data: any) => {
              
              console.log(data);
              this.response = data;
              this.contractList = this.response;
              this.filteredContracts = this.contractList;
              this.totalContracts = this.contractList.length;
            },
            error: (error: any) =>{
              console.error(error);
            }
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
      contract.status_desc.toLowerCase().includes(term)
      
      
    );
  }  
  getContracts(): void {
 
    
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
    
  }
  renovateContract(id: number): void {
    this.contractService.renovateContract(id).subscribe(console.log);  
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
