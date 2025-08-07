import { Component, output, EventEmitter, Input, Output, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule,NgForm,NgModel } from '@angular/forms';
import { Client } from '../models/client';
import { ClientService } from '../services/client.service';
import { response } from 'express';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.css'
})
export class ClientDetailComponent {
  //Declaramos variables
  editMode = false;
  client:Client = {
    id:0,
    cve_internal: '',
    name: '',
    mother_lastname: '',
    father_lastname: '',
    telephone1: '',
    telephone2: '',
    email1: '',
    email2: '',
    status: 0,
    status_desc: '',
    created_at: new Date(),
    created_by: '',
    updated_at: new Date(),
    updated_by: ''
  }
  
  constructor(private clientService: ClientService,private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: Client) {
    if (data) {
      this.client = data;
      this.editMode = true;
    }
  }
 formData = new FormData();

onSubmit(): void {
  const formData = new FormData();
  if (this.client.name == '') {
    alert('Please enter your name')
  }
  else if (this.client.father_lastname == '') {
    alert('Please enter your last name')
  }
  else if (this.client.mother_lastname == '') {
    alert('Please enter your last name')
  }
  else if (this.client.email1 == '') {
    alert('Please enter your email')
  }
  else if (this.client.telephone1 == '') {
    alert('Please enter your phone number')
  }
  else{
    formData.append('name', this.client.name);
    formData.append('father_lastname', this.client.father_lastname);
    formData.append('mother_lastname', this.client.mother_lastname);
    formData.append('email1', this.client.email1);
    formData.append('email2', this.client.email2);
    formData.append('telephone1', this.client.telephone1);
    formData.append('telephone2', this.client.telephone2);
    console.log("Se guardara el cliente",this.client);
    this.clientService.createNewClient(formData).subscribe({
      next: (res) => {
          console.log('Cliente guardado exitosamente:', res);
          alert("Cliente guardado exitosamente");
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  this.closeModal();
}
closeModal(): void {
  this.dialog.closeAll();
}
evaluateClientStatus(){
  if(this.client.status == 0){
    this.client.status = 1;
    this.client.status_desc = 'Activo';
  }
  else{
    this.client.status = 0;
    this.client.status_desc = 'Inactivo';
  }
}
updateClient(id:number){
  console.log("Se actualizará el cliente",this.client);
  const formData = new FormData();
  this.clientService.updateClient(this.formData).subscribe({
    next: (res) => {
        console.log('Cliente actualizado exitosamente:', res);
        alert("Cliente actualizado exitosamente");
    },
    error: (error) => {
      console.error(error);
    }
  })
  this.closeModal();
}
}
