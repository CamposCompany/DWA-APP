import { Component } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AuthService } from '../../shared/services/auth.service';
import { LoadingService } from '../../shared/services/loading.service';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule, LoadingComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService, LoadingService],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      document: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const password = this.loginForm.get('password')?.value;
      const encodedPassword = btoa(password);

      this.loginForm.patchValue({ password: encodedPassword });
      const auth$ = this.authService.authenticate(this.loginForm.getRawValue());

      this.loadingService.showLoaderUntilCompleted(auth$).subscribe({
        next: ((res) => {
          console.log(res);
        }),
        error: ((err) => {
          this.errorMessage = err.error.message;
        })
      });
    }
  }
}
