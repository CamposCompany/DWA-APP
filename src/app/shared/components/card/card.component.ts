import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() title!: string;
  @Input() description?: string;
  @Input() validity?: string;
  @Input() duration?: string;
  @Input() imageSrc!: string;
  @Input() size: 'small' | 'large' = 'large';
}
