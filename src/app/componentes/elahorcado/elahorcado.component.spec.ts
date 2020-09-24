import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElahorcadoComponent } from './elahorcado.component';

describe('ElahorcadoComponent', () => {
  let component: ElahorcadoComponent;
  let fixture: ComponentFixture<ElahorcadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElahorcadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElahorcadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
