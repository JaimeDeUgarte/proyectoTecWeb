import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayGamesComponent } from './display-games.component';

describe('DisplayGamesComponent', () => {
  let component: DisplayGamesComponent;
  let fixture: ComponentFixture<DisplayGamesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayGamesComponent]
    });
    fixture = TestBed.createComponent(DisplayGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
