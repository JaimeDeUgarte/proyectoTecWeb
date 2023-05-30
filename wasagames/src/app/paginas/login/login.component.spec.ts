import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ] // Declaración del componente LoginComponent para las pruebas unitarias
    })
    .compileComponents(); // Compilación del componente y sus dependencias

    fixture = TestBed.createComponent(LoginComponent); // Creación del componente LoginComponent dentro del fixture
    component = fixture.componentInstance; // Obtención de la instancia del componente
    fixture.detectChanges(); // Detección de cambios en el componente y su vista
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Prueba para verificar que el componente se ha creado correctamente
  });
});
