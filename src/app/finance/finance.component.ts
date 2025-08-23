import { Component, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TransactionService } from '../services/transaction.service';
import { Balance } from '../models/balance';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule,NgForm,NgModel } from '@angular/forms';

import { NgModule } from '@angular/core';
@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.css'
})
export class FinanceComponent {
  constructor(public dialog: MatDialog, private transactionService: TransactionService){}
  balance:number = 0;
  ingress:number = 0;
  egresse:number = 0;
  amount:number = 0;
  logedUser = 'Admin';
  contract_id = 1;
  balances: Balance[] = [];
  ngOnInit(): void {
    this.getBalance();
  }
  
  closeModal(){
    this.dialog.closeAll();
  }
  getBalance():void {
    this.transactionService.getBalance().subscribe(
      (data: any) => {
        console.log(data.message);
        console.log(data);
  
        this.balances = data;
      },
      (error: any) => {
        console.error(error);
      }
    )
  }
  onSubmit():void{

   const formData = new FormData();
  formData.append('amount', this.amount.toString());
  formData.append('client_id', this.logedUser);
  formData.append('contract_id', this.contract_id.toString());

  this.transactionService.addFunds(formData).subscribe({
    next: (res) => {
      alert(res.message);
      console.log(res);
      this.dialog.closeAll();
    },
    error: (err) => console.error('Error al agregar fondos:', err)
  });
  }
}