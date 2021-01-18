import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditclasstypeComponent } from './editclasstype.component';

describe('EditclasstypeComponent', () => {
  let component: EditclasstypeComponent;
  let fixture: ComponentFixture<EditclasstypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditclasstypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditclasstypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
