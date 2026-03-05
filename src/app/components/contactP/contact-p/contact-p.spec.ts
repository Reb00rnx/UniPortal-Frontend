import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPComponent } from './contact-p';

describe('ContactP', () => {
  let component: ContactPComponent;
  let fixture: ComponentFixture<ContactPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactPComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
