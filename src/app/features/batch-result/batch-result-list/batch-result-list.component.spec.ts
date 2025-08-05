import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchResultListComponent } from './batch-result-list.component';

describe('BatchResultListComponent', () => {
  let component: BatchResultListComponent;
  let fixture: ComponentFixture<BatchResultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchResultListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
