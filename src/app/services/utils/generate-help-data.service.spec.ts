import { TestBed } from '@angular/core/testing';

import { GenerateHelpDataService } from './generate-help-data.service';

describe('GenerateHelpDataService', () => {
  let service: GenerateHelpDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateHelpDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
