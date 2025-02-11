import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesPanelComponent } from './challenges-panel.component';

describe('ChallengesPanelComponent', () => {
  let component: ChallengesPanelComponent;
  let fixture: ComponentFixture<ChallengesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengesPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChallengesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
