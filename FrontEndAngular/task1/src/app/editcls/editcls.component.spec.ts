import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditclsComponent } from './editcls.component';

describe('PostResumeComponent', () => {
  let component: EditclsComponent;
  let fixture: ComponentFixture<EditclsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditclsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditclsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
