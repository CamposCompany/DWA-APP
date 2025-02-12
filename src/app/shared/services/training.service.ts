import { inject, Injectable } from '@angular/core';
import { Http } from './http.service';
import { Observable, catchError, map, throwError, firstValueFrom, async } from 'rxjs';
import { Training, UserTrainingData } from '../models/training.model';
import Swal from 'sweetalert2';
import { TrainingTimerService } from '../pages/training-view/services/training-timer.service';
import { TrainingEntityService } from '../../store/training/training-entity.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private readonly trainingEntityService = inject(TrainingEntityService);
  private readonly trainingTimerService = inject(TrainingTimerService);

  async completeTrainingWithFeedback(trainingId: number): Promise<{ success: boolean, training?: Training }> {
    const duration = this.trainingTimerService.getElapsedTime();

    try {
      const response = await firstValueFrom(this.trainingEntityService.completeTraining(trainingId, duration));
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
