import { NFC } from "@ionic-native/nfc/ngx";
import { IoTizeComService, DiscoveredDeviceType } from "../com-service-interface";
import { Observable } from "rxjs";
import { ComProtocol } from '@iotize/device-client.js/protocol/api';
import { Platform } from '@ionic/angular';
export declare class IoTizeNfc implements IoTizeComService {
    nfc: NFC;
    private platform;
    constructor(nfc: NFC, platform: Platform);
    startScan(): Observable<DiscoveredDeviceType>;
    checkAvailable(): Promise<void>;
    stopScan(): Promise<void>;
    getProtocol(): ComProtocol;
    logError(error: any): void;
    devicesArray(): Observable<DiscoveredDeviceType[]>;
    clearDevices(): void;
    private ndefToDiscoveredDevice;
    private convertBytesToBLEAddress;
}
