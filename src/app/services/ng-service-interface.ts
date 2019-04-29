import { ComProtocol } from "@iotize/device-client.js/protocol/api";
import { Observable } from 'rxjs';

export interface IoTizeNgService {
    startScan():Observable<any>;
    checkAvailable(): Promise<void>;
    stopScan(): Promise<void>;
    getProtocol(device: any): ComProtocol;
}