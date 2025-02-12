import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymMemberViewComponent } from './gym-member-view.component';

describe('GymMemberViewComponent', () => {
  let component: GymMemberViewComponent;
  let fixture: ComponentFixture<GymMemberViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymMemberViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GymMemberViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
