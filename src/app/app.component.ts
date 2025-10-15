import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { Product } from './models/product';
import { Header } from './models/header';
import { HeaderSideComponent } from './header-side/header-side.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { FooterSideComponent } from './footer-side/footer-side.component';
import { ProductsComponent } from "./products/products.component";
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderSideComponent, RouterOutlet, SideNavBarComponent, FooterSideComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sistema de control de Cuentas de Streaming y Servicios';
  constructor(private router: Router,public authService: AuthService) {}
  //creamos una variable para almacenar el token
  token: string | null = null;
  public isLoggedIn: boolean = false;  
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((status) => {
      // alert("Cambio en el estado de autenticación: " + status);
      this.isLoggedIn = status;
    });
  
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.router.navigate(['/products-component']);
    // if(localStorage.getItem('access_token')){
    //   this.token = localStorage.getItem('access_token');
    //   alert("Token encontrado, bienvenido de nuevo"+ this.token);
    //   this.router.navigate(['/side-nav-bar'], { queryParams: { showSideBar: true } });
    // }
    // else{
    //   this.router.navigate(['/side-nav-bar'], { queryParams: { showSideBar: false } });
    //   this.router.navigate(['/login']);
    // }
    
  }
  
}
