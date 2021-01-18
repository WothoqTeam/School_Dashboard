import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcostComponent } from './editcost.component';

describe('EditcostComponent', () => {
  let component: EditcostComponent;
  let fixture: ComponentFixture<EditcostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
