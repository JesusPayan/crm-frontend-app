import { Component } from '@angular/core';
import { CommonModule, NgClass, } from '@angular/common';
import { TicketService } from '../services/ticket.service';
import { MatDialog } from '@angular/material/dialog';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';
import { TicketDetail } from '../models/ticketDetail';
import {NgModel,FormsModule} from '@angular/forms';
import { FilterOption } from '../models/filterOption';
@Component({
  selector: 'app-ticket-dashboard',
  standalone: true,
  imports: [NgClass,CommonModule,FormsModule],
  templateUrl: './ticket-dashboard.component.html',
  styleUrl: './ticket-dashboard.component.css'
})
export class TicketDashboardComponent {
constructor(public dialog: MatDialog,private ticketService: TicketService) {
  this.filterTicketList = [...this.ticketList];
 }
ngOnInit() {
  this.loadTickets();

}
ticketList: TicketDetail[] = [];
filterTicketList: TicketDetail[] = [];
filterCriteria:String ='';
filterOptions: FilterOption[] = [
  { id: 1, category: 'Todos' },
  { id: 2, category: 'Abiertos' },
  { id: 3, category: 'Cerrados' },
  { id: 4, category: 'En progreso' }
];
onSelectionChange(category: string) {
        this.filterCriteria = category;
        this.filterTickets();
     
}
//Lógica para filtrar los tickets según el criterio seleccionado  
filterTickets() {
  console.log("Filtrando tickets por criterio:", this.filterCriteria);
  if (this.filterCriteria) {
    if (this.filterCriteria === 'Todos') {
          this.filterTicketList = [...this.ticketList]; // Si se selecciona "Todos", muestra todos los tickets
        } else if (this.filterCriteria === 'Abiertos') {
          this.filterTicketList = this.ticketList.filter(item => item.status === 'Open');
        } else if (this.filterCriteria === 'Cerrados') {
          this.filterTicketList = this.ticketList.filter(item => item.status === 'Closed');
        } else if (this.filterCriteria === 'En progreso') {
          this.filterTicketList = this.ticketList.filter(item => item.status === 'In Progress');
        }
          // this.filterTicketList = this.ticketList.filter(item => item.status === this.filterCriteria);
        } else {
          this.filterTicketList = [...this.ticketList]; // Si no hay selección, muestra todos
        }
      }
    
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
      // console.log("Tickets cargados exitosamente:", res.data);
      this.ticketList = res.data;
      this.filterTicketList = [...this.ticketList];
      // Inicializa la lista filtrada con todos los tickets al cargar
    },
    error: (err) => {
      console.error("Error al cargar los tickets:", err);
    }
  });
}
}