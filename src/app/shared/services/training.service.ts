import { inject, Injectable } from '@angular/core';
import { Http } from './http.service';
import { Observable, catchError, map, throwError, firstValueFrom, async } from 'rxjs';
import { Training, TrainingData, UserTrainingData } from '../models/training';
import Swal from 'sweetalert2';
import { TrainingTimerService } from '../pages/training-view/services/training-timer.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private readonly http = inject(Http);
  private readonly userId: number = JSON.parse(localStorage.getItem('user') || '{}').id;
  private readonly trainingTimerService = inject(TrainingTimerService);

  private readonly routes = {
    trainings: 'trainings',
    userTraining: 'user-training/user',
    completeTraining: 'user-training'
  } as const;

  getAllTrainings(): Observable<Training[]> {
    return this.http.get<TrainingData>(this.routes.trainings).pipe(
      map(res => res.data.trainings),
      catchError((err) => {
        const message = 'Could not load trainings';
        alert(message);
        return throwError(() => err);
      })
    );
  }

  getUserTrainings(): Observable<Training[]> {
    return this.http.get<UserTrainingData>(`${this.routes.userTraining}/${this.userId}`).pipe(
      map(res => res.data),
      catchError((err) => {
        const message = 'Could not load user trainings';
        alert(message);
        return throwError(() => err);
      })
    );
  }

  completeTraining(trainingId: number): Observable<TrainingData> {
    const duration = this.trainingTimerService.getElapsedTime();

    return this.http.post(`${this.routes.completeTraining}/${trainingId}/complete`, { duration });
  }

  async completeTrainingWithFeedback(trainingId: number): Promise<{ success: boolean, training?: Training }> {
    try {
      const response = await firstValueFrom(this.completeTraining(trainingId));
      const result = await Swal.fire({
        title: 'Parabéns!',
        text: 'Você concluiu seu treino com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#4CAF50'
      });

      return { 
        success: result.isConfirmed, 
        training: undefined
      };
    } catch (error) {
      console.error('Error completing training:', error);
      await Swal.fire({
        title: 'Erro',
        text: 'Ocorreu um erro ao concluir o treino',
        icon: 'error'
      });
      return { success: false, training: undefined };
    }
  }
}
