import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../shared/models/users';
import { InputComponent } from '../../shared/components/input/input.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Observable } from 'rxjs';
import { selectUser } from '../../auth/login/store/auth.selectors';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { updateUser } from '../../auth/login/store/auth.action';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    HeaderComponent,
    ButtonComponent
  ]
})
export class UserDataComponent implements OnInit {
  private readonly store = inject(Store<AppState>);
  private readonly userService = inject(UserService);
  private readonly fb = inject(FormBuilder);
  private userId: number = 0;

  userForm: FormGroup;
  genderOptions = ['Masculino', 'Feminino', 'Outro', 'Prefiro não informar'];
  
  currentUser$: Observable<User> = this.store.select(selectUser);

  constructor() {
    
    this.userForm = this.fb.group({
      document: [{value: '', disabled: true}],
      username: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.email]],
      birth_date: [''],
      gender: ['']
    });
  }

  ngOnInit(): void {
    this.currentUser$.subscribe(user => {
      this.userId = user.id;
      this.userForm.patchValue({
        document: user.document,
        username: user.username,
        telephone: user.telephone,
        email: user.email,
        gender: user.gender
      });
    });

    this.userForm.get('document')?.disable();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValues = this.userForm.getRawValue();
      // this.userService.updateUser(formValues, this.userId);
      // this.store.dispatch(updateUser({ user: formValues }));
    }
  }
}
