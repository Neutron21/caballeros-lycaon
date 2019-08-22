import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikerComponent } from './biker.component';

describe('BikerComponent', () => {
  let component: BikerComponent;
  let fixture: ComponentFixture<BikerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
