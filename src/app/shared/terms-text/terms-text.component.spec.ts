import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsTextComponent } from './terms-text.component';

describe('TermsTextComponent', () => {
  let component: TermsTextComponent;
  let fixture: ComponentFixture<TermsTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TermsTextComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
