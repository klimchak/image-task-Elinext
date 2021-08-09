import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLoginPocketComponent } from './dialog-login-pocket.component';

describe('DialogLoginPocketComponent', () => {
  let component: DialogLoginPocketComponent;
  let fixture: ComponentFixture<DialogLoginPocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLoginPocketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLoginPocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
