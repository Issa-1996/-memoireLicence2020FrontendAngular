import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesEpargnesComponent } from './mes-epargnes.component';

describe('MesEpargnesComponent', () => {
  let component: MesEpargnesComponent;
  let fixture: ComponentFixture<MesEpargnesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesEpargnesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesEpargnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
