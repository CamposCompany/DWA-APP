import { Component } from '@angular/core';
import { User } from '../../shared/models/users';
import { CommonModule } from '@angular/common';
import { CardTrainingComponent } from '../card-training/card-training.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardTrainingComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  currentUser: User = JSON.parse(localStorage.getItem('currentUser') || '{}');
}
