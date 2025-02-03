import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumersPanelComponent } from './costumers-panel.component';

describe('CostumersPanelComponent', () => {
  let component: CostumersPanelComponent;
  let fixture: ComponentFixture<CostumersPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostumersPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostumersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
