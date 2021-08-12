import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLoginRaindropComponent } from './dialog-login-raindrop.component';

describe('DialogLoginRaindropComponent', () => {
  let component: DialogLoginRaindropComponent;
  let fixture: ComponentFixture<DialogLoginRaindropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLoginRaindropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLoginRaindropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
