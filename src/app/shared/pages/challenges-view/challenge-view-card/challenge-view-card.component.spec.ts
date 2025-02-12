import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeViewCardComponent } from './challenge-view-card.component';

describe('ChallengeViewCardComponent', () => {
  let component: ChallengeViewCardComponent;
  let fixture: ComponentFixture<ChallengeViewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeViewCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChallengeViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
