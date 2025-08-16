import { Component, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TransactionService } from '../services/transaction.service';
import { Balance } from '../models/balance';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.css'
})
export class FinanceComponent {
constructor(public dialog: MatDialog, private transactionService: TransactionService){}
balance:number = 0;
ingress:number = 0;
egresse:number = 0;
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
}
