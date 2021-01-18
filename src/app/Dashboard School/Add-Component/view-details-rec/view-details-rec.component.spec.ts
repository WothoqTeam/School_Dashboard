import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsRecComponent } from './view-details-rec.component';

describe('ViewDetailsRecComponent', () => {
  let component: ViewDetailsRecComponent;
  let fixture: ComponentFixture<ViewDetailsRecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailsRecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
