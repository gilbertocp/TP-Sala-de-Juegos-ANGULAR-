import { TestBed } from '@angular/core/testing';

import { ArchivosJugadoresService } from './archivos-jugadores.service';

describe('ArchivosJugadoresService', () => {
  let service: ArchivosJugadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivosJugadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
