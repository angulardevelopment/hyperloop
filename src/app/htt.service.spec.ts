import { TestBed, inject } from '@angular/core/testing';

import { HttService } from './htt.service';

describe('HttService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttService]
    });
  });

  it('should be created', inject([HttService], (service: HttService) => {
    expect(service).toBeTruthy();
  }));
});
