import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  constructor() {}

  async initPush() {
    if (Capacitor.getPlatform() === 'android') {
      try {
        const permStatus = await PushNotifications.checkPermissions();
        
        if (permStatus.receive === 'prompt' || permStatus.receive === 'prompt-with-rationale') {
          const perm = await PushNotifications.requestPermissions();
          if (perm.receive !== 'granted') {
          }
        }

        await PushNotifications.register();

        PushNotifications.addListener('registration', (token) => {
          console.log('FCM Token:', token.value);
        });

        PushNotifications.addListener('pushNotificationReceived', (notification) => {
          console.log('Notificação recebida:', notification);
        });

        PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
          console.log('Ação na notificação:', action);
        });

      } catch (e) {
        console.error('Erro ao inicializar push notifications:', e);
      }
    }
  }
} 