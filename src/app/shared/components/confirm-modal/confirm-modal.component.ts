import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { ConfirmModalData } from '../../models/interfaces/confirmModalData';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  standalone: true,
  selector: 'app-confirm-modal',
  imports: [CommonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('scaleAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('150ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ transform: 'scale(0.8)', opacity: 0 }))
      ])
    ])
  ]
})
export class ConfirmModalComponent implements OnDestroy {
  show = false;
  title = '';
  message = '';
  color: 'success' | 'danger' | 'warning' | 'info' = 'info';
  confirmText = 'Confirm';
  cancelText = 'Cancel';

  private sub!: Subscription;

  constructor(private modalService: ModalService) {
    // Listen for modal open requests
    this.sub = this.modalService.modalData$.subscribe((data: ConfirmModalData) => {
      this.title = data.title;
      this.message = data.message;
      this.color = data.color;
      this.confirmText = data.confirmText;
      this.cancelText = data.cancelText;
      this.show = true;
    });
  }

  get icon(): string {
    switch (this.color) {
      case 'success': return 'bi-check-circle-fill';
      case 'danger': return 'bi-exclamation-octagon-fill';
      case 'warning': return 'bi-exclamation-triangle-fill';
      default: return 'bi-info-circle-fill';
    }
  }

  onConfirm() {
    this.modalService.confirm(true);
    this.show = false;
  }

  onCancel() {
    this.modalService.confirm(false);
    this.show = false;
  }

  onBackdropClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-backdrop')) {
      this.onCancel(); // closes modal if backdrop clicked
    }
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation(); // prevent modal close when clicked inside
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
