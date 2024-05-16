import { TestBed } from '@angular/core/testing';

import { TeamService } from './team.service';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ToastService } from 'src/app/shared/toast.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Team } from '../models/team.model';
import { environment } from 'src/environments/environment';
import { CreatedTeam } from '../models/created-team.model';
import { Router } from '@angular/router';

describe('TeamService', () => {
  let service: TeamService;
  let httpMock: HttpTestingController;
  let router: Router;
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        ToastService,
        ToastrService,
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    });
    service = TestBed.inject(TeamService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    toastService = TestBed.inject(ToastService);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get team', () => {
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
    };
    service.setTeam(mockTeam);

    service.getTeam().subscribe((team: Team | null) => {
      expect(team).toEqual(mockTeam);
    });
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
      },
    ];

    service.getAllTeamsByUser().subscribe((teams: Team[]) => {
      expect(teams).toEqual(mockTeams);
    });

    const req = httpMock.expectOne(`${environment.urlApi}/teams`);

    expect(req.request.method).toBe('GET');

    req.flush(mockTeams);

    expect(req.request.method).toBe('GET');

    expect(req.request.url).toBe(`${environment.urlApi}/teams`);

    expect(req.request.body).toEqual(null);
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
      },
    ];

    service
      .getAllTeamsByUserForTournament('Football')
      .subscribe((teams: Team[]) => {
        expect(teams).toEqual(mockTeams);
      });

    const req = httpMock.expectOne(
      `${environment.urlApi}/teams/sport/Football`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockTeams);

    expect(req.request.method).toBe('GET');

    expect(req.request.url).toBe(`${environment.urlApi}/teams/sport/Football`);

    expect(req.request.body).toEqual(null);
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
    };

    service.getTeamByTeamName(mockTeam['name']).subscribe((team: Team) => {
      expect(team).toEqual(mockTeam);
    });

    const req = httpMock.expectOne(
      `${environment.urlApi}/teams/${mockTeam['name']}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockTeam);

    expect(req.request.method).toBe('GET');

    expect(req.request.url).toBe(
      `${environment.urlApi}/teams/${mockTeam['name']}`
    );

    expect(req.request.body).toEqual(null);
  });

  it('should add team', () => {
    const mockTeam: CreatedTeam = {
      name: 'Team A',
      sport: 'Football',
    };

    service.addTeam(mockTeam);

    const req = httpMock.expectOne(`${environment.urlApi}/teams`);

    expect(req.request.method).toBe('POST');

    req.flush(mockTeam);

    expect(router.navigate).toHaveBeenCalledWith([
      `/teams-details/${mockTeam.name}`,
    ]);
  });

  it('should update team', () => {
    const mockTeam: CreatedTeam = {
      id: 1,
      name: 'Team A',
      sport: 'Volley',
    };

    service.updateTeam('Team A', mockTeam);

    const req = httpMock.expectOne(`${environment.urlApi}/teams/Team A`);

    expect(req.request.method).toBe('PUT');

    req.flush(mockTeam);

    expect(router.navigate).toHaveBeenCalledWith([
      `/teams-details/${mockTeam.name}`,
    ]);
  });

  it('should delete team', () => {
    service.deleteTeam('Team A');

    const req = httpMock.expectOne(`${environment.urlApi}/teams/Team A`);

    expect(req.request.method).toBe('DELETE');

    req.flush({});

    expect(router.navigate).toHaveBeenCalledWith(['/profile']);
  });
});
