import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { BLEComProtocol, BLEScanner } from '@iotize/cordova-plugin-iotize-ble';
import { ComProtocol } from '@iotize/device-client.js/protocol/api';
import { IoTizeComService, DiscoveredDeviceType } from "../com-service-interface";

declare var iotizeBLE: any;


@Injectable({
  providedIn: 'root'
})
/**
 * This service gives access 
 */
export class IoTizeBle implements IoTizeComService {

  private scanner = new BLEScanner();
  get isScanning() {
    return this.scanner.isScanning;
  }

  constructor() {}

  startScan(): Subject<DiscoveredDeviceType> {
    return this.scanner.start({});
  }

  checkAvailable(): Promise<void> {
    return new Promise((resolve, reject) => {
      iotizeBLE.checkAvailable((val) => {
        console.log(val);
        val ? resolve() : reject('BlueTooth is not on and ready to use');
      },
        (err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  /**
   * Gets an observable that triggers each time a new tap is discovered
   * @return {Observable<DiscoveredDeviceType>}
   */

  devices(): Observable<DiscoveredDeviceType> {
    return this.scanner.devicesObservable();
  }

  stopScan() {
    console.log('Stop Scanning ...');
      this.scanner.stop();
    }

  getProtocol(device: DiscoveredDeviceType | string): ComProtocol {
    const deviceAddress = (typeof device !== 'string') ? device.address : device;
    return new BLEComProtocol(deviceAddress);
  }
}
