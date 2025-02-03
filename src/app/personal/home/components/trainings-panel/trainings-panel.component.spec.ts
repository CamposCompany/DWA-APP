import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsPanelComponent } from './trainings-panel.component';

describe('TrainingsPanelComponent', () => {
  let component: TrainingsPanelComponent;
  let fixture: ComponentFixture<TrainingsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingsPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
