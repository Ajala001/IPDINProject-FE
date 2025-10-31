import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfirmModalData } from '../../models/interfaces/confirmModalData';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
   private modalDataSubject = new Subject<ConfirmModalData>();
  private confirmSubject = new Subject<boolean>();

  // Observable for modal data
  modalData$ = this.modalDataSubject.asObservable();

  // Observable for confirm/cancel responses
  confirmResponse$ = this.confirmSubject.asObservable();

  // 🟢 Open modal and return a Promise<boolean>
  open(data: ConfirmModalData): Promise<boolean> {
    debugger;
    this.modalDataSubject.next(data);
    return new Promise<boolean>((resolve) => {
      const sub = this.confirmResponse$.subscribe((result) => {
        resolve(result);
        sub.unsubscribe(); // clean up after resolving
      });
    });
  }

  // 🟢 Emit user’s choice
  confirm(result: boolean) {
    this.confirmSubject.next(result);
  }
}
