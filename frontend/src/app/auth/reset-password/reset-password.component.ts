import { Component } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { LoadingService } from '../../shared/services/loading.service';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule, LoadingComponent, CommonModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  providers: [LoadingService]
})
export class ResetPasswordComponent {
  currentStep: number = 1;
  loginForm: FormGroup = new FormGroup({});
  phoneForm: FormGroup = new FormGroup({});  
  passwordForm: FormGroup = new FormGroup({});  
  errorMessage: string = '';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      document: ['', [Validators.required]]
    });
    
  }
  passwordFieldType: string = 'password';
  
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }


  onSubmit(): void {

    if (this.loginForm.valid) {
      this.currentStep += 1;
      console.log(this.currentStep);
    }
  }
}
