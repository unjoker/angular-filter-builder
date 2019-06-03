import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurableTableComponent } from './configurable-table.component';

describe('ConfigurableTableComponent', () => {
  let component: ConfigurableTableComponent;
  let fixture: ComponentFixture<ConfigurableTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurableTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
