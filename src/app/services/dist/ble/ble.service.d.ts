import { Observable } from 'rxjs';
import { ComProtocol, ComProtocolOptions } from '@iotize/device-client.js/protocol/api';
import { IoTizeComService, DiscoveredDeviceType } from "../com-service-interface";
export declare class IoTizeBle implements IoTizeComService {
    private scanner;
    private devicesArray$;
    private _devicesArray;
    private scannerSubscription;
    /**
     * @returns {boolean} BLE scanner status
     */
    readonly isScanning: boolean;
    constructor();
    private initObservables;
    startScan(): Observable<DiscoveredDeviceType>;
    checkAvailable(): Promise<void>;
    /**
     * Gets an observable that triggers each time a new tap is discovered
     * @return {Observable<DiscoveredDeviceType>}
     */
    devices(): Observable<DiscoveredDeviceType>;
    devicesArray(): Observable<DiscoveredDeviceType[]>;
    clearDevices(except?: DiscoveredDeviceType[]): void;
    stopScan(): void;
    getProtocol(device: DiscoveredDeviceType | string, options?: ComProtocolOptions): ComProtocol;
}
