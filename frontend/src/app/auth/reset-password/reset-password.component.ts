import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingService } from '../../shared/services/loading.service';
import { AuthService } from '../../shared/services/auth.service';
import { passwordMatchValidator } from '../../shared/utils/validators/password.validator';
import { OnlyOneErrorPipe } from '../../shared/utils/pipes/only-one-error.pipe';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { ForgotPasswordRes } from '../../shared/models/authenticate';
import { Observable } from 'rxjs';
import { UserService } from '../../shared/services/user.service';

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
  @ViewChild('fourthStepTemplate', { static: true }) fourthStepTemplate!: TemplateRef<any>;

  firstStepForm: FormGroup = new FormGroup({});
  secondStepForm: FormGroup = new FormGroup({});
  fourthStepForm: FormGroup = new FormGroup({});

  token: string | null = null;

  currentStep: number = 1;
  errorMessage: string = '';
  sentSmsMessage: string = '';
  userPhone: string = '';
  userId: number = 0;

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    if (this.token) this.currentStep = 4;

    this.initForms();
  }

  private initForms(): void {
    if (this.currentStep === 1) {
      this.firstStepForm = this.fb.group({
        document: ['', [Validators.required]]
      });

      this.secondStepForm = this.fb.group({
        telephone: ['', [Validators.required]]
      });
    } else if (this.currentStep === 4) {
      this.fourthStepForm = this.fb.group(
        {
          password: ['', [Validators.required]],
          password_confirmation: ['', Validators.required],
        },
        { validators: [passwordMatchValidator()] }
      );
    }
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
    } else if (this.currentStep === 4 && this.fourthStepForm.valid) {
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
      case 4:
        return this.fourthStepTemplate;
      default:
        return null;
    }
  }


  private executeStep1(): void {
    const auth$: Observable<ForgotPasswordRes> = this.authService.resetPasswordStep1(this.firstStepForm.value);

    this.loadingService.showLoaderUntilCompleted(auth$).subscribe({
      next: (res: ForgotPasswordRes) => {
        this.userPhone = this.formatPhoneNumber(res.data.telephone)
        this.userId = res.data.userId;
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
      next: (res) => {
        this.sentSmsMessage = res.message;
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
    const formValues = { ...this.fourthStepForm.getRawValue() };

    const encodedPassword = btoa(formValues.password);
    formValues.password = encodedPassword;

    const encodedPasswordConfirmation = btoa(formValues.password_confirmation);
    formValues.password_confirmation = encodedPasswordConfirmation;

    const payload = {
      ...formValues,
      token: this.token
    }

    console.log(payload);

    if (this.token) {
      const auth$ = this.userService.updateUser(payload, this.userId);
      
      this.loadingService.showLoaderUntilCompleted(auth$).subscribe({
        next: (res) => {
          console.log(res);
        }
      })
    }
  }
}
