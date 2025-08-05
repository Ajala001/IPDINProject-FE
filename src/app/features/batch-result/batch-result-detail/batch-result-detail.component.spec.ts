import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchResultDetailComponent } from './batch-result-detail.component';

describe('BatchResultDetailComponent', () => {
  let component: BatchResultDetailComponent;
  let fixture: ComponentFixture<BatchResultDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchResultDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchResultDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
