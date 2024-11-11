import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExaminationListComponent } from './user-examination-list.component';

describe('UserExaminationListComponent', () => {
  let component: UserExaminationListComponent;
  let fixture: ComponentFixture<UserExaminationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserExaminationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserExaminationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
