import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttmapComponent } from './httmap.component';

describe('HttmapComponent', () => {
  let component: HttmapComponent;
  let fixture: ComponentFixture<HttmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
