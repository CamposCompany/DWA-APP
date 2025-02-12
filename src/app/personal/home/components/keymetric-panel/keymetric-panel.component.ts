import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { dashboardInformation } from '../../../../shared/models/dashboard.model';

@Component({
  selector: 'app-keymetric-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keymetric-panel.component.html',
  styleUrl: './keymetric-panel.component.scss'
})
export class KeymetricPanelComponent implements OnInit {
  @Input() userCount$: Observable<number> = new Observable<number>
  @Input() trainingCount$: Observable<number> = new Observable<number>
  @Input() exerciseCount$: Observable<number> = new Observable<number>
  dashboardInformation: dashboardInformation[] = [];

  ngOnInit(): void {
    this.setDashboardInformation();
  }

  private setDashboardInformation(): void {
    this.dashboardInformation = [{
      icon: 'fa-solid fa-clipboard-user',
      title: 'Total de alunos',
      value$: this.userCount$
    },
    {
      icon: 'fa-regular fa-clipboard',
      title: 'Exercícios cadastrados',
      value$: this.exerciseCount$
    },
    {
      icon: 'fa-regular fa-clipboard',
      title: 'Treinos cadastrados',
      value$: this.trainingCount$
    }]
  }
}
