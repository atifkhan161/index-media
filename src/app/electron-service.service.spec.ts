import { TestBed, inject } from '@angular/core/testing';

import { ElectronServiceService } from './electron-service.service';

describe('ElectronServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElectronServiceService]
    });
  });

  it('should be created', inject([ElectronServiceService], (service: ElectronServiceService) => {
    expect(service).toBeTruthy();
  }));
});
