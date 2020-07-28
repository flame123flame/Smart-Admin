import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SapJsonComponent } from './sap-json.component';

describe('SapJsonComponent', () => {
  let component: SapJsonComponent;
  let fixture: ComponentFixture<SapJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SapJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SapJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
