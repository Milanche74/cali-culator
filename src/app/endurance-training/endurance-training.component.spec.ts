import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnduranceTrainingComponent } from './endurance-training.component';

describe('EnduranceTrainingComponent', () => {
  let component: EnduranceTrainingComponent;
  let fixture: ComponentFixture<EnduranceTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnduranceTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnduranceTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
