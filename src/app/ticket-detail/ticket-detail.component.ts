import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule,NgForm,NgModel } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TicketDetail } from '../models/ticketDetail';
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
    priority: 'Medium',
    status: 'Open',  
    createdAt: new Date(),
    updatedAt: new Date(),
    assignedTo: '',
    createdBy: '',
    attachments: []
  };

  constructor(public dialog: MatDialog) {   }
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

  }

}  
