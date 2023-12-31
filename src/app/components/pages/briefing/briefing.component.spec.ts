import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefingComponent } from './briefing.component';

describe('BriefingComponent', () => {
  let component: BriefingComponent;
  let fixture: ComponentFixture<BriefingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BriefingComponent]
    });
    fixture = TestBed.createComponent(BriefingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
