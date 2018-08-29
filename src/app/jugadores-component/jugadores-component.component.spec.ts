import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadoresComponentComponent } from './jugadores-component.component';

describe('JugadoresComponentComponent', () => {
  let component: JugadoresComponentComponent;
  let fixture: ComponentFixture<JugadoresComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JugadoresComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadoresComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
