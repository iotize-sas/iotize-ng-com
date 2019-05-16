import { Observable, Subscription, PartialObserver, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { BLEComProtocol, BLEScanner } from '@iotize/cordova-plugin-iotize-ble';
import { ComProtocol } from '@iotize/device-client.js/protocol/api';
import { IoTizeComService, DiscoveredDeviceType } from "../com-service-interface";
import { distinct } from "rxjs/operators";

declare var iotizeBLE: any;


@Injectable({
  providedIn: 'root'
})
/**
 * This class gives access to the IoTize BLE cordova plugin within an injectable angular service
 */
export class IoTizeBle implements IoTizeComService {

  private scanner = new BLEScanner();
  private devicesArray$: BehaviorSubject<DiscoveredDeviceType[]>;
  private _devicesArray : DiscoveredDeviceType[] = [];
  private scannerSubscription: Subscription;
  /**
   * @returns {boolean} BLE scanner status
   */
  get isScanning() {
    return this.scanner.isScanning;
  }
  constructor() {
    this.initObservables();
  }

  private initObservables() {
    this.devicesArray$ = new BehaviorSubject<DiscoveredDeviceType[]>([]);
    const observer: PartialObserver<DiscoveredDeviceType> = {
      next: val => {
        this._devicesArray.push(val);
        this.devicesArray$.next(this._devicesArray);
      }
    }
    this.scannerSubscription = this.devices().pipe(
      distinct( _ => _.address) // filtering by address
    ).subscribe(observer)
  }

  startScan(): Observable<DiscoveredDeviceType> {
    this.scanner.start({});
    return this.devices().pipe(
      distinct( _ => _.address)
    );
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

  devicesArray(): Observable<DiscoveredDeviceType[]> {
    return this.devicesArray$.asObservable();
  }

  clearDevices(except: DiscoveredDeviceType[] = []) {
    this._devicesArray = except;
    this.scannerSubscription.unsubscribe();
    this.initObservables();
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
