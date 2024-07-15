import { TestBed } from '@angular/core/testing';

import { MemberService } from './member.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/shared/toast.service';
import { Member } from '../models/member.type';

describe('MemberService', () => {
  let service: MemberService;
  let memberServiceSpy: jasmine.SpyObj<MemberService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TeamService', [
      'addMember',
      'deleteMemberByTeamName',
    ]);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        ToastService,
        ToastrService,
        { provide: MemberService, useValue: spy },
      ],
    });
    service = TestBed.inject(MemberService);
    memberServiceSpy = TestBed.inject(
      MemberService
    ) as jasmine.SpyObj<MemberService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add member', () => {
    const mockMember: Member = {
      id: 1,
      firstName: 'User1',
      lastName: 'User',
    };

    memberServiceSpy.addMember.and.returnValue();

    memberServiceSpy.addMember('Team A', mockMember);

    expect(memberServiceSpy.addMember.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
  });

  it('should delete member', () => {
    const mockMember: Member = {
      id: 1,
      firstName: 'User1',
      lastName: 'User',
    };

    memberServiceSpy.deleteMemberByTeamName.and.returnValue();

    memberServiceSpy.deleteMemberByTeamName('Team A', mockMember);

    expect(memberServiceSpy.deleteMemberByTeamName.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
  });
});
