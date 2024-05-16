import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTeammatesComponent } from './register-teammates.component';

describe('RegisterTeammatesComponent', () => {
  let component: RegisterTeammatesComponent;
  let fixture: ComponentFixture<RegisterTeammatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterTeammatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterTeammatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
