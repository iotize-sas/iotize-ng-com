import { TestBed } from '@angular/core/testing';

import { IoTizeBle } from './ble.service';

describe('BleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IoTizeBle = TestBed.get(IoTizeBle);
    expect(service).toBeTruthy();
  });
});
