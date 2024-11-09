import { Component } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { LoadingService } from '../../shared/services/loading.service';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-first-login',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule, LoadingComponent, CommonModule, RouterModule],
  templateUrl: './first-access.component.html',
  styleUrl: './first-access.component.scss',
  providers: [LoadingService]
})
export class FirstLoginComponent {
  firstAccessForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.firstAccessForm = this.fb.group({
      name: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]]
    });
    
  }
  passwordFieldType: string = 'password';


  onSubmit(): void {

  }
}
