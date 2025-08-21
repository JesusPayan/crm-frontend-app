import { Component , Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ClientService } from '../services/client.service';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-import-modal',
  standalone: true,
  imports: [],
  templateUrl: './import-modal.component.html',
  styleUrl: './import-modal.component.css'
})
export class ImportModalComponent {
  caller: string = '';
  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: string , private clientService: ClientService, private productService: ProductService) {
    this.caller = data;
  }
    
  ngOnInit(): void {
    if (this.data ) {
      this.caller = this.data;
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
  // Validamos si se cargo un archivo    
  formData.append('file', this.selectedFile!);
    if (this.selectedFile) {
      console.log('Se ha seleccionado un archivo:', this.selectedFile.name);
      formData.append('file', this.selectedFile, this.selectedFile.name);
      // se define si el que llamo es clientes o productos
      if (this.caller == 'clients') {
        if (this.selectedFile.name != 'clients.csv') {
          alert("El archivo seleccionado no es el correcto, debe ser 'clients.csv'");
        }else{
          console.log("Se va a importaran clientes");
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
        }  
      }else if (this.caller == 'products') {
        if (this.selectedFile.name != 'products.csv') {
          alert("El archivo seleccionado no es el correcto, debe ser 'products.csv'");
        }else{
          console.log("Se va a importar los productos");
          this.productService.importProducts(formData).subscribe({
          next: (res) => {
              console.log(res.message);
              alert(res.message);
              this.closeModal();
          },
          error: (error) => {
            console.error(error);
          }
        })
      }
        }
        
    }
    else{
      console.log('No se ha seleccionado un archivo.');
      alert('No se ha seleccionado un archivo.');
    }
    
  }
  closeModal() {
    this.selectedFile = null;
    this.dialog.closeAll();
  }
  

}
