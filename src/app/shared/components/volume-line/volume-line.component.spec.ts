import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeLineComponent } from './volume-line.component';

describe('VolumeLineComponent', () => {
  let component: VolumeLineComponent;
  let fixture: ComponentFixture<VolumeLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
