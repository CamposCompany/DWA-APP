import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../shared/models/users';
import { InputComponent } from '../../shared/components/input/input.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Observable } from 'rxjs';
import { AuthEntityService } from '../../auth/store/auth-entity.service';

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
  private readonly authEntityService = inject(AuthEntityService);
  private readonly fb = inject(FormBuilder);
  private userId: number = 0;

  userForm: FormGroup;
  genderOptions = ['Masculino', 'Feminino', 'Outro', 'Prefiro não informar'];
  
  currentUser$: Observable<User> = this.authEntityService.currentUser$;

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
      this.authEntityService.update({
        id: this.userId,
        ...formValues
      }).subscribe();
    }
  }
}
