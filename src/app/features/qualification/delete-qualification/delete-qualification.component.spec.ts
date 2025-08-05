import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQualificationComponent } from './delete-qualification.component';

describe('DeleteQualificationComponent', () => {
  let component: DeleteQualificationComponent;
  let fixture: ComponentFixture<DeleteQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteQualificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
