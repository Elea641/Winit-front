import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalMentionsPageComponent } from './legal-mentions-page.component';

describe('LegalMentionsPageComponent', () => {
  let component: LegalMentionsPageComponent;
  let fixture: ComponentFixture<LegalMentionsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LegalMentionsPageComponent],
    });
    fixture = TestBed.createComponent(LegalMentionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
