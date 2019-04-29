import { TestBed } from '@angular/core/testing';

import { IoTizeTap } from './tap.service';

describe('DeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IoTizeTap = TestBed.get(IoTizeTap);
    expect(service).toBeTruthy();
  });
});
