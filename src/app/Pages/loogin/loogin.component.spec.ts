import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LooginComponent } from './loogin.component';

describe('LooginComponent', () => {
  let component: LooginComponent;
  let fixture: ComponentFixture<LooginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LooginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LooginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
