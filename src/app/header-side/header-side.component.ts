import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Router } from '@angular/router';
import { inject } from '@angular/core';
@Component({
  selector: 'app-header-side',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-side.component.html',
  styleUrl: './header-side.component.css'
})
export class HeaderSideComponent {
dashboardName: string = '';
private router = inject(Router)
  openDashboard(dashboardName: string) {
    console.log("Abriendo dashboard: " + dashboardName);
    switch (dashboardName) {
      case 'clients-dashboard':
        this.router.navigate(['/client-component'], { queryParams: { showButtons: true } });  
        this.dashboardName = "Dashboard de Clientes";
      break;
      case 'contracts-dashboard':
        this.router.navigate(['/contract-component'], { queryParams: { showButtons: true } }); 
        this.dashboardName = "Dashboard de Contratos"; 
      break;
      case 'products-dashboard':
        this.router.navigate(['/product-component'], { queryParams: { showButtons: true } });  
        this.dashboardName = "Dashboard de Productos";
      break;
      case 'dashboard-component':
        this.router.navigate(['/dashboard-component'], { queryParams: { showButtons: true } }); 
        this.dashboardName = "Dashboard Transacciones"; 
      break;
      case 'tickets-dashboard':
        console.log("Navegando a Soporte");
        this.router.navigate(['/tickets-dashboard'], { queryParams: { showButtons: true } });
        this.dashboardName = "Dashboard de Soporte";
        // this.router.navigate(['/tickets-dashboard'], { queryParams: { showButtons: true } });

    }
}
logout() {
  this.router.navigate(['/login-registry']);
  // window.location.href = "http://localhost:8080/realms/manage-users/protocol/openid-connect/auth?client_id=angular-app&redirect_uri=http://localhost:4200&response_type=code";
}
}