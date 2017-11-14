import { TestBed, inject } from '@angular/core/testing';

import { SoundcloudApiService } from './soundcloud-api.service';

describe('SoundcloudApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoundcloudApiService]
    });
  });

  it('should be created', inject([SoundcloudApiService], (service: SoundcloudApiService) => {
    expect(service).toBeTruthy();
  }));
});
