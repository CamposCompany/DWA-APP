import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingService } from '../../shared/services/loading.service';
import { encodePasswordFields, passwordMatchValidator } from '../../shared/utils/validators/password.validator';
import { OnlyOneErrorPipe } from '../../shared/utils/pipes/only-one-error.pipe';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { ForgotPasswordRes } from '../../shared/models/authenticate.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthEntityService } from '../store/auth-entity.service';
import Swal from 'sweetalert2';


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
  providers: [LoadingService, AuthEntityService]
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('firstStepTemplate', { static: true }) firstStepTemplate!: TemplateRef<any>;
  @ViewChild('secondStepTemplate', { static: true }) secondStepTemplate!: TemplateRef<any>;
  @ViewChild('thirdStepTemplate', { static: true }) thirdStepTemplate!: TemplateRef<any>;
  @ViewChild('fourthStepTemplate', { static: true }) fourthStepTemplate!: TemplateRef<any>;

  firstStepForm: FormGroup = new FormGroup({});
  secondStepForm: FormGroup = new FormGroup({});
  thirdStepForm: FormGroup = new FormGroup({});

  currentStep: number = 1;
  userID: number = 0;
  token: string = '';

  errorMessage = new BehaviorSubject<string | null>(null);
  sentSmsMessage = new BehaviorSubject<string | null>(null);
  userPhone = new BehaviorSubject<string | null>(null);

  errorMessage$ = this.errorMessage.asObservable();
  sentSmsMessage$ = this.sentSmsMessage.asObservable();
  userPhone$ = this.userPhone.asObservable();

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private authEntityService: AuthEntityService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.firstStepForm = this.fb.group({
      document: ['', [Validators.required]]
    });

    this.secondStepForm = this.fb.group({
      code: ['', [Validators.required]]
    });

    this.thirdStepForm = this.fb.group({
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]]
    }, {
      validators: [passwordMatchValidator()]
    });
  }

  handleBackButtonClick(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.errorMessage.next(null);
    }
  }

  public onSubmit(): void {
    switch (this.currentStep) {
      case 1:
        if (this.firstStepForm.valid) {
          this.executeStep1();
        }
        break;
      case 2:
        if (this.secondStepForm.valid) {
          this.executeStep2();
        }
        break;
      case 3:
        if (this.thirdStepForm.valid) {
          this.finalizeReset();
        }
        break;
    }
  }

  public getCurrentStepTemplate(): TemplateRef<any> {
    switch (this.currentStep) {
      case 1:
        return this.firstStepTemplate;
      case 2:
        return this.secondStepTemplate;
      case 3:
        return this.thirdStepTemplate;
      default:
        return this.firstStepTemplate;
    }
  }

  private executeStep1(): void {
    const auth$: Observable<ForgotPasswordRes> = this.authEntityService.resetPasswordStep1(this.firstStepForm.value.document);

    this.loadingService.showLoaderUntilCompleted(auth$).subscribe({
      next: (res: ForgotPasswordRes) => {
        this.userPhone.next(this.formatPhoneNumber(res.data.telephone));
        this.userID = res.data.userID;
        this.token = res.data.token;
        this.currentStep++
        this.errorMessage.next(null);
      },
      error: (err) => this.errorMessage.next(err.error?.message || 'Erro inesperado.'),
    });
  }

  private executeStep2(): void {
    const payload = {
      code: this.secondStepForm.value.code,
      userID: this.userID
    };

    const auth$: Observable<ForgotPasswordRes> = this.authEntityService.resetPasswordStep2(payload);

    this.loadingService.showLoaderUntilCompleted(auth$).subscribe({
      next: () => {
        this.currentStep++;
        this.errorMessage.next(null);
      },
      error: (err) => this.errorMessage.next(err.error?.message || 'Erro inesperado.'),
    });
  }

  private finalizeReset(): void {
    const formValues = encodePasswordFields(this.thirdStepForm.getRawValue(), [
      'password',
      'password_confirmation',
    ]);

    const payload = {
      ...formValues,
      userID: this.userID,
      token: this.token
    }

    if (this.userID) {
      const auth$ = this.authEntityService.resetPasswordLastStep(payload);

      this.loadingService.showLoaderUntilCompleted(auth$).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: res.message,
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });

          setTimeout(() => {
            this.route.navigateByUrl('login');
          }, 1500);
        },
        error: (err) => this.errorMessage.next(err.error?.message || 'Erro inesperado.'),
      })
    }
  }

  private formatPhoneNumber(phone: string): string {
    const maskedPhone = phone.replace(/(\d{2})(\d{1})\d{4}(\d{4})/, '($1) $2****-$3');
    return maskedPhone;
  }
}