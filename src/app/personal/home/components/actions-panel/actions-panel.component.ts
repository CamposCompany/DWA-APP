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
        icon: 'assets/icons/shoes.svg',
        title: 'Meus Alunos',
        route: '/personal/gym-members'
      },
      {
        icon: 'assets/icons/verified-list.svg',
        title: 'Treinos',
        route: '/personal/trainings',
      },
      {
        icon: 'assets/icons/verified-list.svg',
        title: 'Exercícios',
        route: '/personal/exercises',
      }
    ];
  }

  onActionClick(route: string): void {
    if (route) {
      this.router.navigate([route]);
    }
  }
}
