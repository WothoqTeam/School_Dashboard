import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExamAppComponent } from './edit-exam-app.component';

describe('EditExamAppComponent', () => {
  let component: EditExamAppComponent;
  let fixture: ComponentFixture<EditExamAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExamAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExamAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
