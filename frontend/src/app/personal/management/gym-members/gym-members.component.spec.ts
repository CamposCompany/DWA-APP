import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymMembersComponent } from './gym-members.component';

describe('GymMembersComponent', () => {
  let component: GymMembersComponent;
  let fixture: ComponentFixture<GymMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymMembersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GymMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
