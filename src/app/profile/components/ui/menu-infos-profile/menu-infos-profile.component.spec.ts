import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInfosProfileComponent } from './menu-infos-profile.component';

describe('MenuInfosProfileComponent', () => {
  let component: MenuInfosProfileComponent;
  let fixture: ComponentFixture<MenuInfosProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MenuInfosProfileComponent]
    });
    fixture = TestBed.createComponent(MenuInfosProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
