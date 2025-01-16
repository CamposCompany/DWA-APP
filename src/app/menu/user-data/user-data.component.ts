import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../shared/models/users';
import { InputComponent } from '../../shared/components/input/input.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    HeaderComponent,
    ButtonComponent
  ]
})
export class UserDataComponent implements OnInit {
  userForm: FormGroup;
  genderOptions = ['Masculino', 'Feminino', 'Outro', 'Prefiro não informar'];
  currentUser: User;

  constructor(private fb: FormBuilder) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    this.userForm = this.fb.group({
      document: [{value: '', disabled: true}],
      username: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.email]],
      birth_date: [''],
      gender: ['']
    });
  }

  ngOnInit(): void {
    this.userForm.patchValue({
      document: this.currentUser.document,
      username: this.currentUser.username,
      telephone: this.currentUser.telephone,
      email: this.currentUser.email,
      gender: this.currentUser.gender
    });

    this.userForm.get('document')?.disable();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValues = this.userForm.getRawValue();
      console.log(formValues);
    }
  }
}
