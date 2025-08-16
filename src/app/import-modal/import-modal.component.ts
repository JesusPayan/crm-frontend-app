import { Component , Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ClientService } from '../services/client.service';



@Component({
  selector: 'app-import-modal',
  standalone: true,
  imports: [],
  templateUrl: './import-modal.component.html',
  styleUrl: './import-modal.component.css'
})
export class ImportModalComponent {
  caller: string = '';
  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: string , private clientService: ClientService){ 
    if (data ) {
      this.caller = data;
    }
   }
    selectedFile: File | null = null;
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }
  onSubmit(): void {
    const formData = new FormData();

    if (this.selectedFile) {
      console.log('Se ha seleccionado un archivo:', this.selectedFile.name);
      formData.append('file', this.selectedFile, this.selectedFile.name);
      if (this.caller == 'clients') {
        console.log("Se va a importar los clientes");
        this.clientService.importClients(formData).subscribe({
      next: (res) => {
          console.log(res.message);
          alert(res.message);
          this.closeModal();
      },

      error: (error) => {
        console.error(error);
      }
    })

      }else if (this.caller == 'products') {
        console.log("Se va a importar los productos");
      }
    }else{
      console.log('No se ha seleccionado un archivo.');
      alert('No se ha seleccionado un archivo.');
    }
    
  }
  closeModal() {
    this.selectedFile = null;
    this.dialog.closeAll();
  }
  

}
