import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrainingViewComponent } from './user-training-view.component';

describe('UserTrainingViewComponent', () => {
  let component: UserTrainingViewComponent;
  let fixture: ComponentFixture<UserTrainingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTrainingViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserTrainingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
