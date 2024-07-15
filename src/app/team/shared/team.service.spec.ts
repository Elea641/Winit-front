import { TestBed } from '@angular/core/testing';

import { TeamService } from './team.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastService } from 'src/app/shared/toast.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Team } from '../models/team.type';
import { of } from 'rxjs';
import { CreatedTeam } from '../models/created-team.class';

describe('TeamService', () => {
  let service: TeamService;
  let teamServiceSpy: jasmine.SpyObj<TeamService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TeamService', [
      'getTeam',
      'getAllTeamsByUser',
      'getAllTeamsByUserForTournament',
      'getTeamByTeamName',
      'addTeam',
      'updateTeam',
      'deleteTeam',
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
        { provide: TeamService, useValue: spy },
      ],
    });
    service = TestBed.inject(TeamService);
    teamServiceSpy = TestBed.inject(TeamService) as jasmine.SpyObj<TeamService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get team', () => {
    const mockTeam: Team = {
      id: 1,
      leaderName: 'John Doe',
      members: [
        { id: 1, firstName: 'Member 1', lastName: 'Member 2' },
        { id: 2, firstName: 'Member 2', lastName: 'Member 2' },
      ],
      name: 'Team A',
      sport: 'Football',
      teamMembersCount: 2,
      totalPlayers: 11,
      validated: true,
      ownerId: 123,
      ownerFirstName: 'John',
      ownerLastName: 'Doe',
    };

    teamServiceSpy.getTeam.and.returnValue(of(mockTeam));

    teamServiceSpy.getTeam().subscribe(team => {
      expect(team).toEqual(mockTeam);
    });

    expect(teamServiceSpy.getTeam.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
  });

  it('should get team', () => {
    const mockTeam: Team = {
      id: 1,
      leaderName: 'John Doe',
      members: [
        { id: 1, firstName: 'Member 1', lastName: 'Member 2' },
        { id: 2, firstName: 'Member 2', lastName: 'Member 2' },
      ],
      name: 'Team A',
      sport: 'Football',
      teamMembersCount: 2,
      totalPlayers: 11,
      validated: true,
      ownerId: 123,
      ownerFirstName: 'John',
      ownerLastName: 'Doe',
    };

    teamServiceSpy.getTeam.and.returnValue(of(mockTeam));

    teamServiceSpy.getTeam().subscribe(team => {
      expect(team).toEqual(mockTeam);
    });

    expect(teamServiceSpy.getTeam.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
  });

  it('should return teams for user', () => {
    const mockTeams: Team[] = [
      {
        id: 1,
        leaderName: 'John Doe',
        members: [
          { id: 1, firstName: 'Member 1', lastName: 'Member 2' },
          { id: 2, firstName: 'Member 2', lastName: 'Member 2' },
        ],
        name: 'Team A',
        sport: 'Football',
        teamMembersCount: 2,
        totalPlayers: 11,
        validated: true,
        ownerId: 123,
        ownerFirstName: 'John',
        ownerLastName: 'Doe',
      },
    ];

    teamServiceSpy.getAllTeamsByUser.and.returnValue(of(mockTeams));

    teamServiceSpy.getAllTeamsByUser().subscribe(team => {
      expect(team).toEqual(mockTeams);
    });

    expect(teamServiceSpy.getAllTeamsByUser.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
  });

  it('should return teams by user for tournament', () => {
    const mockTeams: Team[] = [
      {
        id: 1,
        leaderName: 'John Doe',
        members: [
          { id: 1, firstName: 'Member 1', lastName: 'Member 2' },
          { id: 2, firstName: 'Member 2', lastName: 'Member 2' },
        ],
        name: 'Team A',
        sport: 'Football',
        teamMembersCount: 2,
        totalPlayers: 11,
        validated: true,
        ownerId: 123,
        ownerFirstName: 'John',
        ownerLastName: 'Doe',
      },
    ];

    teamServiceSpy.getAllTeamsByUserForTournament.and.returnValue(
      of(mockTeams)
    );

    teamServiceSpy
      .getAllTeamsByUserForTournament('Football')
      .subscribe(team => {
        expect(team).toEqual(mockTeams);
      });

    expect(teamServiceSpy.getAllTeamsByUserForTournament.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
  });

  it('should return team by teamName', () => {
    const mockTeam: Team = {
      id: 1,
      leaderName: 'John Doe',
      members: [
        { id: 1, firstName: 'Member 1', lastName: 'Member 2' },
        { id: 2, firstName: 'Member 2', lastName: 'Member 2' },
      ],
      name: 'Team A',
      sport: 'Football',
      teamMembersCount: 2,
      totalPlayers: 11,
      validated: true,
      ownerId: 123,
      ownerFirstName: 'John',
      ownerLastName: 'Doe',
    };

    teamServiceSpy.getTeamByTeamName.and.returnValue(of(mockTeam));

    teamServiceSpy
      .getTeamByTeamName(mockTeam['name'])
      .subscribe((team: Team) => {
        expect(team).toEqual(mockTeam);
      });

    expect(teamServiceSpy.getTeamByTeamName.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
  });

  it('should add team', () => {
    const mockTeam: CreatedTeam = {
      name: 'Team A',
      sport: 'Football',
    };

    teamServiceSpy.addTeam.and.returnValue();

    teamServiceSpy.addTeam(mockTeam);

    expect(teamServiceSpy.addTeam.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
  });

  it('should update team', () => {
    const mockTeam: CreatedTeam = {
      id: 1,
      name: 'Team A',
      sport: 'Volley',
    };

    teamServiceSpy.updateTeam.and.returnValue();

    teamServiceSpy.updateTeam('Team A', mockTeam);

    expect(teamServiceSpy.updateTeam.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
  });

  it('should delete team', () => {
    const mockTeamName = 'Team A';

    teamServiceSpy.deleteTeam.and.returnValue();

    service.deleteTeam(mockTeamName);

    expect(teamServiceSpy.deleteTeam.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
  });
});
