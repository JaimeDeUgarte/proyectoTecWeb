import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HadminComponent } from './hadmin.component';

describe('HadminComponent', () => {
  let component: HadminComponent;
  let fixture: ComponentFixture<HadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HadminComponent]
    });
    fixture = TestBed.createComponent(HadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
