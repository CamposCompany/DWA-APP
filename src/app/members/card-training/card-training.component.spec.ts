import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTrainingComponent } from './card-training.component';

describe('CardTrainingComponent', () => {
  let component: CardTrainingComponent;
  let fixture: ComponentFixture<CardTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTrainingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
