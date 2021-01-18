import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScedulePageComponent } from './scedule-page.component';

describe('ScedulePageComponent', () => {
  let component: ScedulePageComponent;
  let fixture: ComponentFixture<ScedulePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScedulePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScedulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
