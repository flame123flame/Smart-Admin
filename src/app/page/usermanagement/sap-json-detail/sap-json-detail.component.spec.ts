import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SapJsonDetailComponent } from './sap-json-detail.component';

describe('SapJsonDetailComponent', () => {
  let component: SapJsonDetailComponent;
  let fixture: ComponentFixture<SapJsonDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SapJsonDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SapJsonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
