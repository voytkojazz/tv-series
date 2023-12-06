import { TestBed } from '@angular/core/testing';

import { SharedFilmTableService } from './shared-film-table.service';

describe('SharedFilmTableService', () => {
  let service: SharedFilmTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedFilmTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
