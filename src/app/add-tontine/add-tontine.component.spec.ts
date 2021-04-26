import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTontineComponent } from './add-tontine.component';

describe('AddTontineComponent', () => {
  let component: AddTontineComponent;
  let fixture: ComponentFixture<AddTontineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTontineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTontineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
