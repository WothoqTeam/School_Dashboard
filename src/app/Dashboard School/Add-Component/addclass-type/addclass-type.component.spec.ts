import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclassTypeComponent } from './addclass-type.component';

describe('AddclassTypeComponent', () => {
  let component: AddclassTypeComponent;
  let fixture: ComponentFixture<AddclassTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddclassTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddclassTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
