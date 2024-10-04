import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExaminationComponent } from './delete-examination.component';

describe('DeleteExaminationComponent', () => {
  let component: DeleteExaminationComponent;
  let fixture: ComponentFixture<DeleteExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteExaminationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
