import { Injectable } from '@angular/core';
import { NFC, NdefEvent } from "@ionic-native/nfc/ngx";
import { IoTizeComService, DiscoveredDeviceType } from "../com-service-interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"
import { ComProtocol } from '@iotize/device-client.js/protocol/api';
import { NFCComProtocol } from '@iotize/device-com-nfc.cordova'
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IoTizeNfc implements IoTizeComService {

  constructor(public nfc: NFC,
    private platform: Platform) { }

  startScan(): Observable<DiscoveredDeviceType> {
    return this.nfc.addNdefListener(() => {
      console.log('NFC listener ON')
      if (this.platform.is('ios')) {
        this.nfc.beginSession();
      }
    },
      (error) => {
        console.error('NFC listener didn\'t start: ', error)
      }).pipe(
        map(ndef => this.ndefToDiscoveredDevice(ndef))
      );
  }

  checkAvailable(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await this.nfc.enabled();
        resolve();
      } catch (error) {
        this.logError(error);
        reject(error);
      }
    });
  }
  stopScan(): Promise<void> {
    return; // no specific way to stop scan
  }
  getProtocol(): ComProtocol {
    return new NFCComProtocol();
  }

  logError(error) {
    console.error('[IoTizeNFC] ERROR: ' + error.message ? error.message : error);
  }

  private ndefToDiscoveredDevice(ndef: NdefEvent): DiscoveredDeviceType {
    console.log(ndef);
    let message = ndef.tag.ndefMessage;
    const appName = String.fromCharCode(...message[3].payload);
    const macAddress = this.convertBytesToBLEAddress(message[2].payload);
    const device: DiscoveredDeviceType = {
      name: appName,
      address: macAddress
    };
    console.log(device);
    return device;
  }

  private convertBytesToBLEAddress(bytes: number[]): string {
    return bytes.slice(1)
      .map(byte => {
        if (byte < 0) {
          byte += 256;
        }
        let byteString = '0' + byte.toString(16).toUpperCase();
        byteString = byteString.slice(-2);
        return byteString;
      })
      .reverse()
      .join(':')
  }
}
