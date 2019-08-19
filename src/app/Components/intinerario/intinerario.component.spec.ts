import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntinerarioComponent } from './intinerario.component';

describe('IntinerarioComponent', () => {
  let component: IntinerarioComponent;
  let fixture: ComponentFixture<IntinerarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntinerarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntinerarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
