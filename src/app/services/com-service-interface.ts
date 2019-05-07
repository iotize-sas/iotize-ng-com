import { ComProtocol } from "@iotize/device-client.js/protocol/api";
import { Observable } from 'rxjs';

export interface IoTizeComService {
    startScan():Observable<DiscoveredDeviceType>;
    checkAvailable(): Promise<void>;
    stopScan(): void | Promise<void>;
    getProtocol(device: any): ComProtocol;
}

export interface DiscoveredDeviceType {
    name: string;
    address: string;
    rssi?: number;
}