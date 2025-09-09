import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';
@Component({
  selector: 'app-ticket-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './ticket-dashboard.component.html',
  styleUrl: './ticket-dashboard.component.css'
})
export class TicketDashboardComponent {
constructor(public dialog: MatDialog) { }
openModal(action: string) {
  // Lógica para abrir el modal basado en el nombre proporcionado
  if (action === 'create-ticket') {
    console.log("Abriendo modal para crear ticket");
    this.dialog.open(TicketDetailComponent);
      
  } else if (action === 'view-ticket') {
    console.log("Abriendo modal para ver ticket");
  }  
}
}