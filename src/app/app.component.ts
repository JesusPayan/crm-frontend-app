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
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderSideComponent, RouterOutlet, SideNavBarComponent, FooterSideComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crm-frontend-app';
  constructor(private router: Router) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.router.navigate(['/products-component']);
    
  }
  
}
