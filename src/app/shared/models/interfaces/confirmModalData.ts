export interface ConfirmModalData {
  title: string;
  message: string;
  color: 'success' | 'danger' | 'warning' | 'info';
  confirmText: string;
  cancelText: string;
}