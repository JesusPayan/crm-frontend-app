import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FinanceComponent } from '../finance/finance.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ContractDetailComponent } from '../contract-detail/contract-detail.component';
import { ClientDetailComponent } from '../client-detail/client-detail.component';
import { ProductsComponent } from '../products/products.component';
import { ClientsComponent } from '../clients/clients.component';
import { ContractComponent } from '../contract/contract.component';
import { inject } from '@angular/core';

@Component({
  selector: 'app-side-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './side-nav-bar.component.html',
  styleUrl: './side-nav-bar.component.css'
})
export class SideNavBarComponent {

  private router = inject(Router)
  constructor(public dialog: MatDialog) { }
  showdashboardButtons = false;
  side:boolean = true;
  openModal(modalName: string) {
    switch (modalName) {
      case 'products-detail':
        this.dialog.open(ProductDetailComponent);
      break
      case 'contract-detail':
        this.dialog.open(ContractDetailComponent);
      break
      case 'client-detail':
        this.dialog.open(ClientDetailComponent);
      break
      case 'finance':
        this.dialog.open(FinanceComponent);
      break
    }
    
  }
  openDashboard(dashboardName: string) {
    console.log("Abriendo dashboard: " + dashboardName);
    switch (dashboardName) {
      case 'clients-dashboard':
        this.router.navigate(['/client-component'], { queryParams: { showButtons: true } });  
      break;
      case 'contracts-dashboard':
        this.router.navigate(['/contract-component'], { queryParams: { showButtons: true } });  
      break;
      case 'products-dashboard':
        this.router.navigate(['/product-component'], { queryParams: { showButtons: true } });  
      break;
      case 'tickets-dashboard':
        this.router.navigate(['/tickets-dashboard'], { queryParams: { showButtons: true } });

    }

}
  openReport(reportName: string) {
    // alert(reportName);
    console.log("Abriendo Reporte: " + reportName);
    switch (reportName) {
      case 'clients-report':
        this.router.navigate(['/client-component'], { queryParams: { showButtons: false } });
      break;
      case 'contract-reports':
        this.router.navigate(['/contract-component'], { queryParams: { showButtons: false } });
      break;
      case 'product-report':
        this.router.navigate(['/product-component'], { queryParams: { showButtons: false } });
    }
  }

}
