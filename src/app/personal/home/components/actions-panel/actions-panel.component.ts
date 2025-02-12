import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actions-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actions-panel.component.html',
  styleUrls: ['./actions-panel.component.scss']
})
export class ActionsPanelComponent implements OnInit {
  dashboardActions: any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setDashboardAction();
  }

  private setDashboardAction(): void {
    this.dashboardActions = [
      {
        icon: 'fa-solid fa-clipboard-user',
        title: 'Meus Alunos',
        route: '/personal/gym-members'
      },
      {
        icon: 'fa-regular fa-clipboard',
        title: 'Exercícios',
        route: '/personal/exercises',
      },
      {
        icon: 'fa-regular fa-clipboard',
        title: 'Treinos',
        route: '/personal/trainings',
      }
    ];
  }

  onActionClick(route: string): void {
    if (route) {
      this.router.navigate([route]);
    }
  }
}
