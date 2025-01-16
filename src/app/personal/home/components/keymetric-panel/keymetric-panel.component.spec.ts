import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeymetricPanelComponent } from './keymetric-panel.component';

describe('KeymetricPanelComponent', () => {
  let component: KeymetricPanelComponent;
  let fixture: ComponentFixture<KeymetricPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeymetricPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeymetricPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
