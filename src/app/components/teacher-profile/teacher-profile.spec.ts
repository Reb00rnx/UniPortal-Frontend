import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProfileComponent } from './teacher-profile';

describe('TeacherProfile', () => {
  let component: TeacherProfileComponent;
  let fixture: ComponentFixture<TeacherProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherProfileComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TeacherProfileComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
