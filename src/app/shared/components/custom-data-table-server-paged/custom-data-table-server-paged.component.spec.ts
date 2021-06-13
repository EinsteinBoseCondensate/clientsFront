import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDataTableServerPagedComponent } from './custom-data-table-server-paged.component';

describe('CustomDataTableServerPagedComponent', () => {
  let component: CustomDataTableServerPagedComponent;
  let fixture: ComponentFixture<CustomDataTableServerPagedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDataTableServerPagedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDataTableServerPagedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
