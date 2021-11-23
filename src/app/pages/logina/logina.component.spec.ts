import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginaComponent } from './logina.component';

describe('LoginaComponent', () => {
  let component: LoginaComponent;
  let fixture: ComponentFixture<LoginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
