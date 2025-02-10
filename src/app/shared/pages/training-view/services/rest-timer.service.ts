import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RestTimerService {
  private timerSubject = new BehaviorSubject<number | null>(null);
  timer$ = this.timerSubject.asObservable();
  private intervalId: any;

  startTimer(seconds: number) {
    this.stopTimer();
    this.timerSubject.next(seconds);
    
    this.intervalId = setInterval(() => {
      const currentValue = this.timerSubject.value;
      if (currentValue !== null && currentValue > 0) {
        this.timerSubject.next(currentValue - 1);
      } else {
        this.stopTimer();
        Swal.fire({
          title: 'Descanso Concluído!',
          text: 'Você já pode iniciar a próxima série',
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    }, 1000);
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.timerSubject.next(null);
  }

  isTimerActive(): boolean {
    return this.timerSubject.value !== null;
  }
} 