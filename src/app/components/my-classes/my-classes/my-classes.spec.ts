import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClassesComponent } from './my-classes';

describe('MyClasses', () => {
  let component: MyClassesComponent;
  let fixture: ComponentFixture<MyClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyClassesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
