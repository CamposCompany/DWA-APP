import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardExerciseComponent } from './user-card-exercise.component';

describe('UserCardExerciseComponent', () => {
  let component: UserCardExerciseComponent;
  let fixture: ComponentFixture<UserCardExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardExerciseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCardExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
