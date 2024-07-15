import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMemberComponent } from './menu-member.component';

describe('MenuMemberComponent', () => {
  let component: MenuMemberComponent;
  let fixture: ComponentFixture<MenuMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MenuMemberComponent],
    });
    fixture = TestBed.createComponent(MenuMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
