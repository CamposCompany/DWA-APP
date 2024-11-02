import { Component } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input.component';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { LoadingService } from '../../shared/services/loading.service';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { passwordMatchValidator, strongPasswordValidator } from '../../shared/utils/validators/password.validator';
import { OnlyOneErrorPipe } from '../../shared/utils/pipes/only-one-error.pipe';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule, LoadingComponent, CommonModule, RouterModule, OnlyOneErrorPipe],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  providers: [LoadingService]
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup = new FormGroup({});
  phoneForm: FormGroup = new FormGroup({});
  passwordForm: FormGroup = new FormGroup({});

  currentStep: number = 1;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      document: ['', [Validators.required]]
    });

    this.phoneForm = this.fb.group({
      phone: ['', [Validators.required]]
    });

    this.passwordForm = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required
          ],
        ],
        password_confirmation: ['', Validators.required],
      },
      { validators: [passwordMatchValidator()] }
    );
  }

  handleBackButtonClick(): void {
    if (this.currentStep !== 1) {
      this.currentStep--;
    }
  }

  onSubmit(): void {
    switch (this.currentStep) {
      case 1:
        if (this.resetPasswordForm.valid) {
          this.currentStep += 1;
        }
        break;
      case 2:
        if (this.phoneForm.valid) {
          this.currentStep += 1;
        }
        break;
      case 3:
        if (this.passwordForm.valid) {
          alert('Senha alterada com sucesso!');
        }
        break;
    }
  }
}
