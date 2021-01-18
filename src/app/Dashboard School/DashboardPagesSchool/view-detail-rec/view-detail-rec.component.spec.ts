import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailRecComponent } from './view-detail-rec.component';

describe('ViewDetailRecComponent', () => {
  let component: ViewDetailRecComponent;
  let fixture: ComponentFixture<ViewDetailRecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailRecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailRecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
