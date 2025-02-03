import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsSecurityComponent } from './terms-security.component';

describe('TermsSecurityComponent', () => {
  let component: TermsSecurityComponent;
  let fixture: ComponentFixture<TermsSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsSecurityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermsSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
