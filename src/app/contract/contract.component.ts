import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractService } from '../services/contract.service';
import { MatDialog } from '@angular/material/dialog';
import { Contract } from '../models/contract';
import { Header } from '../models/header';
import { response } from 'express';
import { FormsModule,NgModel,FormControl,ReactiveFormsModule, } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
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
  filteredContracts: Contract[] = [];
  contractList: Contract[] = [];
  totalContracts: number = 0;
  nextToExpire: number = 0;
  available: number = 0;
  contracted: number = 0;
  //Inicializamos el componente e inyectamos dependencias
  constructor(public dialog: MatDialog,public contractService: ContractService) { }
   headerList: Header[] = [
    {title: this.available, description: 'Disponibles',image: 'https://dummyimage.com/600x400/000/fff', bgColor: 'bg-green-500', textColor: 'text-green-500'},
    {title: this.nextToExpire, description: 'Proximos a vencer',image: 'https://dummyimage.com/600x400/000/fff', bgColor: 'bg-red-500', textColor: 'text-red-900'},
    {title: this.contracted, description: 'Contratados',image: 'https://dummyimage.com/600x400/000/fff', bgColor: 'bg-blue-500', textColor: 'text-blue-500'},
    {title: this.totalContracts, description: 'Total productos',image: 'https://dummyimage.com/600x400/000/fff', bgColor: 'bg-orange-500',  textColor: 'text-stone-900'},
  ];

  filterContracts() {
    const term = this.searchText.toLowerCase().trim();
    if (!term) {
      this.filteredContracts = this.contractList;
      return;
    }
    this.filteredContracts = this.contractList.filter(contract =>
      contract.client_id.toString().includes(term) ||
      contract.contract_type_desc.toLowerCase().includes(term)
    );
  }  
}
