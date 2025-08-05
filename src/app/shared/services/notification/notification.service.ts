import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationSnackbarComponent, NotificationType } from '../../components/notification-snackbar/notification-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {}
  show(message: string, type: NotificationType = 'info') {
  const baseDuration = {
    success: 3000,
    info: 4000,
    warning: 5000,
    error: 6000
  };

  const duration = baseDuration[type] || 4000;

  this.snackBar.openFromComponent(NotificationSnackbarComponent, {
    data: { message, type },
    duration,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['custom-snackbar']
  });
}
}
