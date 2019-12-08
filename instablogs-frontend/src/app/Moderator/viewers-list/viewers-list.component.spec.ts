import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewersListComponent } from './viewers-list.component';

describe('ViewersListComponent', () => {
  let component: ViewersListComponent;
  let fixture: ComponentFixture<ViewersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
