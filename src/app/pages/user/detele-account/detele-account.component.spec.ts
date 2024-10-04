import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeteleAccountComponent } from './detele-account.component';

describe('DeteleAccountComponent', () => {
  let component: DeteleAccountComponent;
  let fixture: ComponentFixture<DeteleAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeteleAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeteleAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
