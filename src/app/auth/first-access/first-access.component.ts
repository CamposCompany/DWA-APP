import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { LoadingService } from '../../shared/services/loading.service';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { encodePasswordFields, passwordMatchValidator } from '../../shared/utils/validators/password.validator';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { Store } from '@ngrx/store';

import { updateUser } from '../login/store/auth.action';
import { AppState } from '../../reducers';
@Component({
  selector: 'app-first-login',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule, LoadingComponent, CommonModule, RouterModule],
  templateUrl: './first-access.component.html',
  styleUrl: './first-access.component.scss',
  providers: [LoadingService, AuthService]
})
export class FirstLoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly loadingService = inject(LoadingService);
  private readonly store = inject(Store<AppState>);

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

      const auth$ = this.userService.updateUser(formValues, Number(this.userId));

      this.loadingService.showLoaderUntilCompleted(auth$).subscribe({
        next: ({ data, message }) => {
          this.store.dispatch(updateUser({ user: data }));
          this.errorMessageSubject.next(null);
          this.successMessageSubject.next(message);
          this.router.navigateByUrl('on-boarding');
        },
        error: (err) => {
          this.errorMessageSubject.next(err.error?.message || 'Erro inesperado.');
        }
      });
    }
  }
}
