import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletBatchResultComponent } from './delet-batch-result.component';

describe('DeletBatchResultComponent', () => {
  let component: DeletBatchResultComponent;
  let fixture: ComponentFixture<DeletBatchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletBatchResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletBatchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
