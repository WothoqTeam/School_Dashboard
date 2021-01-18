import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclassesComponent } from './addclasses.component';

describe('AddclassesComponent', () => {
  let component: AddclassesComponent;
  let fixture: ComponentFixture<AddclassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddclassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddclassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
