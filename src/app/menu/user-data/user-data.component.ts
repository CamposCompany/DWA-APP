import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../shared/models/users.model';
import { InputComponent } from '../../shared/components/input/input.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Observable } from 'rxjs';
import { tap, catchError, of } from 'rxjs';
import Swal from 'sweetalert2';
import { UserEntityService } from '../../store/user/user-entity.service';

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
  private readonly userEntityService = inject(UserEntityService);
  private readonly fb = inject(FormBuilder);
  private userId: number = 0;

  userForm: FormGroup;
  readonly genderMap = {
    'male': 'Masculino',
    'female': 'Feminino',
    'other': 'Outro'
  };

  genderOptions = [
    { value: 'male', label: 'Masculino' },
    { value: 'female', label: 'Feminino' },
    { value: 'other', label: 'Outro' }
  ].map(option => option.label);
  
  currentUser$: Observable<User> = this.userEntityService.currentUser$;

  constructor() {
    
    this.userForm = this.fb.group({
      document: [{value: '', disabled: true}],
      username: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.email]],
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
        gender: this.genderMap[user.gender as keyof typeof this.genderMap || 'other']
      });
    });

    this.userForm.get('document')?.disable();
  }

  onSubmit(): void {
    if (this.userForm.valid && this.userId) {
      const formValues = this.userForm.getRawValue();
      
      const genderValue = Object.entries(this.genderMap)
        .find(([key, value]) => value === formValues.gender)?.[0] || 'other';

      const updateData = {
        id: Number(this.userId),
        ...formValues,
        gender: genderValue
      };

      this.userEntityService.update(updateData).pipe(
        tap(async () => {
          await Swal.fire({
            title: 'Sucesso!',
            text: 'Dados atualizados com sucesso',
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
        }),
        catchError((error) => {
          console.error('Error updating user:', error);
          return of(null);
        })
      ).subscribe();
    }
  }
}
