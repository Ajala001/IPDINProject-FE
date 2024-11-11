import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrainingListComponent } from './user-training-list.component';

describe('UserTrainingListComponent', () => {
  let component: UserTrainingListComponent;
  let fixture: ComponentFixture<UserTrainingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTrainingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTrainingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
