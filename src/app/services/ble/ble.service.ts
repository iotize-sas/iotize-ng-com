import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { BLEComProtocol } from '@iotize/cordova-plugin-iotize-ble';
import { ComProtocol } from '@iotize/device-client.js/protocol/api';
import { IoTizeNgService } from "./../ng-service-interface";

declare var iotizeBLE: any;

export interface DiscoveredDeviceType {
  name: string;
  address: string;
  rssi?: number;
}

@Injectable({
  providedIn: 'root'
})
/**
 * This service gives access 
 */
export class IoTizeBle implements IoTizeNgService {

  private _isScanning = false;
  get isScanning() {
    return this._isScanning;
  }
  private devices$: Subject<DiscoveredDeviceType>;

  constructor() {
    this.devices$ = new Subject<DiscoveredDeviceType>();
  }

  startScan() {

    console.log('Start Scanning ...');

      iotizeBLE.startScan((result) => {
        console.log(result);
        this._isScanning = true;
        if (result === 'Ok') return;

        this.devices$.next(result);
      }, (error) => {
        iotizeBLE.getLastError((lasterror) => {
          console.log('error ' + lasterror);
          this._isScanning = false;
          this.devices$.error(error);
        });
      });

      return this.devices();
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
    return this.devices$.asObservable();
  }

  stopScan() {
    console.log('Stop Scanning ...');
    this._isScanning = false;
    return new Promise<void>((resolve,reject) => {

      iotizeBLE.stopScan((result) => {
        console.log(result);
        this._isScanning = false;
        resolve();
      },
      (error) => {
        console.log('failed : ' + error);
        reject(error);
      });
    });
    }

  getProtocol(device: DiscoveredDeviceType | string): ComProtocol {
    const deviceAddress = (typeof device !== 'string') ? device.address : device;
    return new BLEComProtocol(deviceAddress);
  }
}
