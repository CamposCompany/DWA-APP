import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingService } from '../../shared/services/loading.service';
import { AuthService } from '../../shared/services/auth.service';
import { passwordMatchValidator } from '../../shared/utils/validators/password.validator';
import { OnlyOneErrorPipe } from '../../shared/utils/pipes/only-one-error.pipe';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { ForgotPasswordRes } from '../../shared/models/authenticate';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  imports: [
    InputComponent,
    ButtonComponent,
    LoadingComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    OnlyOneErrorPipe
  ],
  providers: [LoadingService, AuthService]
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('firstStepTemplate', { static: true }) firstStepTemplate!: TemplateRef<any>;
  @ViewChild('secondStepTemplate', { static: true }) secondStepTemplate!: TemplateRef<any>;
  @ViewChild('thirdStepTemplate', { static: true }) thirdStepTemplate!: TemplateRef<any>;

  firstStepForm: FormGroup = new FormGroup({});
  secondStepForm: FormGroup = new FormGroup({});
  thirdStepForm: FormGroup = new FormGroup({});

  currentStep = 1;
  errorMessage = '';
  userPhone = '';

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.firstStepForm = this.fb.group({
      document: ['', [Validators.required]]
    });

    this.secondStepForm = this.fb.group({
      telephone: ['', [Validators.required]]
    });

    this.thirdStepForm = this.fb.group(
      {
        password: ['', [Validators.required]],
        password_confirmation: ['', Validators.required],
      },
      { validators: [passwordMatchValidator()] }
    );
  }

  handleBackButtonClick(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.errorMessage = '';
    }
  }

  onSubmit(): void {
    if (this.currentStep === 1 && this.firstStepForm.valid) {
      this.executeStep1();
    } else if (this.currentStep === 2 && this.secondStepForm.valid) {
      this.executeStep2();
    } else if (this.currentStep === 3 && this.thirdStepForm.valid) {
      this.finalizeReset();
    }
  }

  getCurrentStepTemplate(): TemplateRef<any> | null {
    switch (this.currentStep) {
      case 1:
        return this.firstStepTemplate;
      case 2:
        return this.secondStepTemplate;
      case 3:
        return this.thirdStepTemplate;
      default:
        return null;
    }
  }


  private executeStep1(): void {
    const auth$: Observable<ForgotPasswordRes> = this.authService.resetPasswordStep1(this.firstStepForm.value);

    this.loadingService.showLoaderUntilCompleted(auth$).subscribe({
      next: (res: ForgotPasswordRes) => {
        this.userPhone = this.formatPhoneNumber(res.data.telephone)
        this.currentStep++
      },
      error: (err) => this.errorMessage = err.error?.message || 'Erro inesperado.',
    });
  }

  private executeStep2(): void {
    const payload = {
      ...this.firstStepForm.value,
      ...this.secondStepForm.value,
    };

    const auth$: Observable<ForgotPasswordRes> = this.authService.resetPasswordStep2(payload);

    this.loadingService.showLoaderUntilCompleted(auth$).subscribe({
      next: () => {
        this.currentStep++
      },
      error: (err) => this.errorMessage = err.error?.message || 'Erro inesperado.',
    });
  }

  private formatPhoneNumber(phone: string): string {
    const maskedPhone = phone.replace(/(\d{2})(\d{1})\d{4}(\d{4})/, '($1) $2****-$3');
    return maskedPhone;
  }

  private finalizeReset(): void {
    alert('Senha alterada com sucesso!');
  }
}
