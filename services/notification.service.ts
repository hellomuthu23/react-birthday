import { Notifications } from 'expo';

export class NotificationService {
  static notify(title: string, body: string) {
    Notifications.presentLocalNotificationAsync({
      body: body,
      title: title,
    });
  }
}
