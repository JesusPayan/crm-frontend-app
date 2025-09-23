import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegistryComponent } from './login-registry.component';

describe('LoginRegistryComponent', () => {
  let component: LoginRegistryComponent;
  let fixture: ComponentFixture<LoginRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRegistryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
