import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymMembersPanelComponent } from './gym-members-panel.component';

describe('CostumersPanelComponent', () => {
  let component: GymMembersPanelComponent;
  let fixture: ComponentFixture<GymMembersPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymMembersPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GymMembersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
