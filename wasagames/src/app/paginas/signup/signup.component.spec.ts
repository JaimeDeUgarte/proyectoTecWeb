import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';

describe('SignUpComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  // Configuración antes de cada prueba
  beforeEach(async () => {
    // Configuración del módulo de pruebas
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ] // Componentes declarados en el módulo de pruebas
    })
    .compileComponents(); // Compila los componentes del módulo de pruebas

    // Creación de la instancia del componente y su fixture
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;

    // Detecta los cambios en el componente
    fixture.detectChanges();
  });

  // Prueba unitaria: el componente debe crearse correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

