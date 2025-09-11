import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule,NgForm,NgModel } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TicketDetail } from '../models/ticketDetail';
import { TicketService } from '../services/ticket.service';
@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css'
})
export class TicketDetailComponent {
  ticket: TicketDetail = {
    id: 0,
    title: '',
    description: '',
    priority: 'Low',
    status: 'Open',  
    created_at: new Date(),
    updated_at: new Date(),
    assignedTo: 0,
    createdBy: '',
    attachments: []
  };

  constructor(public dialog: MatDialog, private ticketService: TicketService) {   }
  ticketTitle: string = '';
  ticketDescription: string = '';
  ticketPriority: string[] =['Medium','High','Low','Critical'];
  selectedFile: File | null = null;
  editMode = false;
  onFileSelected(event: Event): void {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        this.selectedFile = fileInput.files[0];
      }
    }
    closeModal() {
    this.dialog.closeAll();
    // Lógica para cerrar el modal
    }
  onSubmit() {
    // Lógica para manejar el envío del formulario  
    const formData = new FormData();
    formData.append('title', this.ticket.title);
    formData.append('description', this.ticket.description);
    formData.append('priority', this.ticket.priority);
    formData.append('status', 'New');
    formData.append('createdBy', 'user1');
    formData.append('assignedTo', 'admin');
    formData.append('createdAt', new Date().toISOString());
    formData.append('updatedAt', new Date().toISOString());
    if (this.selectedFile) {
      formData.append('attachment', this.selectedFile, this.selectedFile.name);
    }
    this.ticketService.createTicket(formData).subscribe({
      next: (res) => {
    
        console.log('Ticket Agregado exitosamente:', res);
        alert(res.message);
        this.selectedFile = null;
        this.dialog.closeAll();
      },
      error: (err) => {
        console.error('Error al crear el ticket:', err)
        alert('Error al crear el ticket');
        this.closeModal();
    }
    });
    
  }

}  
