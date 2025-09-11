import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { TicketService } from '../services/ticket.service';
import { MatDialog } from '@angular/material/dialog';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';
import { TicketDetail } from '../models/ticketDetail';
@Component({
  selector: 'app-ticket-dashboard',
  standalone: true,
  imports: [NgClass,CommonModule],
  templateUrl: './ticket-dashboard.component.html',
  styleUrl: './ticket-dashboard.component.css'
})
export class TicketDashboardComponent {
constructor(public dialog: MatDialog,private ticketService: TicketService) { }
ngOnInit() {
  this.loadTickets();

}
ticketList: TicketDetail[] = [];
openModal(action: string) {
  // Lógica para abrir el modal basado en el nombre proporcionado
  if (action === 'create-ticket') {
    console.log("Abriendo modal para crear ticket");
    this.dialog.open(TicketDetailComponent);
      
  } else if (action === 'view-ticket') {
    console.log("Abriendo modal para ver ticket");
  }  
}
loadTickets() {
  console.log("Cargando tickets...");
  // Lógica para cargar los tickets desde el backend
  this.ticketService.getTickets().subscribe({
    next: (res) => {
      console.log("Tickets cargados exitosamente:", res.data);
      this.ticketList = res.data;
    },
    error: (err) => {
      console.error("Error al cargar los tickets:", err);
    }
  });
}
}