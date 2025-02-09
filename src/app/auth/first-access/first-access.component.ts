import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { LoadingService } from '../../shared/services/loading.service';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { encodePasswordFields, passwordMatchValidator } from '../../shared/utils/validators/password.validator';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { AuthEntityService } from '../store/auth-entity.service';
import { UserEntityService } from '../../store/user/user-entity.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-first-login',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule, LoadingComponent, CommonModule, RouterModule],
  templateUrl: './first-access.component.html',
  styleUrl: './first-access.component.scss',
  providers: [LoadingService, AuthEntityService]
})
export class FirstLoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly userEntityService = inject(UserEntityService);

  readonly passwordFieldType = 'password';

  private readonly errorMessageSubject = new BehaviorSubject<string | null>(null);
  private readonly successMessageSubject = new BehaviorSubject<string | null>(null);

  readonly errorMessage$ = this.errorMessageSubject.asObservable();
  readonly successMessage$ = this.successMessageSubject.asObservable();

  private token = localStorage.getItem('token');
  private userId = this.activatedRoute.snapshot.paramMap.get('id');


  firstAccessForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    telephone: ['', [Validators.required]],
    email: ['', [Validators.email]],
    password: ['', [Validators.required]],
    password_confirmation: ['', [Validators.required]]
  }, { validators: passwordMatchValidator() });

  onSubmit(): void {
    if (this.firstAccessForm.valid && this.token && this.userId) {
      const formValues = encodePasswordFields(this.firstAccessForm.getRawValue(), [
        'password',
        'password_confirmation',
      ]);

      const updateData = {
        id: Number(this.userId),
        ...formValues
      };

      this.userEntityService.update(updateData).pipe(
        tap(() => {
          this.errorMessageSubject.next(null);
          this.successMessageSubject.next('Usuário atualizado com sucesso');
          this.router.navigateByUrl('on-boarding');
        }),
        catchError((err: HttpErrorResponse) => {
          this.errorMessageSubject.next(err.error?.message || 'Erro inesperado.');
          return of(null);
        })
      ).subscribe();
    }
  }
}
