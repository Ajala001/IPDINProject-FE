import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

@Component({
  selector: 'app-notification-snackbar',
  imports: [CommonModule],
  templateUrl: './notification-snackbar.component.html',
  styleUrl: './notification-snackbar.component.css'
})
export class NotificationSnackbarComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string; type: NotificationType },
    private snackBarRef: MatSnackBarRef<NotificationSnackbarComponent>
  ) {}

  getIcon(type: NotificationType): string {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      case 'warning': return '⚠️';
      default: return '';
    }
  }

  dismiss(): void {
    this.snackBarRef.dismiss();
  }
}
