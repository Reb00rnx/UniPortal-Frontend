import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPComponent } from './privacy-p';

describe('PrivacyP', () => {
  let component: PrivacyPComponent;
  let fixture: ComponentFixture<PrivacyPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyPComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
