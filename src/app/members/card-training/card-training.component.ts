import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-card-training',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './card-training.component.html',
  styleUrls: ['./card-training.component.scss']
})
export class CardTrainingComponent {
  onViewTraining() {
    // Implement your navigation or action logic here
    console.log('View training clicked');
  }
}
