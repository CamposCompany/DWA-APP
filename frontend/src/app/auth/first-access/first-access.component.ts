import { Component } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { LoadingService } from '../../shared/services/loading.service';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-first-login',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule, LoadingComponent, CommonModule, RouterModule],
  templateUrl: './first-access.component.html',
  styleUrl: './first-access.component.scss',
  providers: [LoadingService]
})
export class FirstLoginComponent {
  firstLoginForm: FormGroup = new FormGroup({});
  passwordFieldType: string = 'password';

  private token: string = 'seu-token-de-autenticacao';
  private userId: number = 123; 

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.firstLoginForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
      passwordConfirmation: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('passwordConfirmation')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.firstLoginForm.valid) {
      const { password, passwordConfirmation } = this.firstLoginForm.value;

      this.userService.updateUser(
        { password, confirm_password: passwordConfirmation },
        this.token,
        this.userId
      ).subscribe({
        next: (response) => {
          console.log('Usuário atualizado com sucesso!', response);
        },
        error: (error) => {
          console.error('Erro ao atualizar o usuário', error);
        }
      });
    } else {
      console.log('Formulário inválido');
    }
  }
}
