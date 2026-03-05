import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradebookComponent } from './gradebook';

describe('Gradebook', () => {
  let component: GradebookComponent;
  let fixture: ComponentFixture<GradebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradebookComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GradebookComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
