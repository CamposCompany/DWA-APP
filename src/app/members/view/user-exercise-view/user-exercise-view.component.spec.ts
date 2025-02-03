import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExerciseViewComponent } from './user-exercise-view.component';

describe('UserExerciseViewComponent', () => {
  let component: UserExerciseViewComponent;
  let fixture: ComponentFixture<UserExerciseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserExerciseViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserExerciseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
