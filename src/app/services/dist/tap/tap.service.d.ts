import { Tap, SessionState } from '@iotize/device-client.js/device';
import { ComProtocol } from '@iotize/device-client.js/protocol/api';
import { Observable } from 'rxjs';
export declare class IoTizeTap {
    isReady: boolean;
    tap: Tap;
    connectionPromise?: Promise<any>;
    session?: SessionState;
    private sessionSubscription?;
    constructor();
    /**
     * Initialize a communication with the given protocol, creating a new .
     * It connects to the Tap and gets the current session state
     * @returns promise resolved on connection success
     * @throws On connection failure, promise is rejected
     * @param protocol Communication protocol, using BLE,NFC or WiFi, attached to an IoTize Tap
     */
    init(protocol: ComProtocol): Promise<void>;
    /**
     * Connect with the given protocol
     * @param protocol Communication protocol, using BLE,NFC or WiFi, attached to an IoTize Tap
     */
    private connect;
    /**
     * Disconnects from the current tap
     */
    disconnect(): Promise<void>;
    /**
     * @returns Promise<string> on the current Tap serial number
     */
    getSerialNumber(): Promise<string>;
    /**
     * Clears IotizeTap. Sets isReady to false
     */
    clear(): void;
    /**
     * Logs on the current Tap with the given credentials, and refresh session state
     * @param user
     * @param password
     * @returns true on login success
     */
    login(user: string, password: string): Promise<boolean>;
    /**
     */
    logout(): Promise<boolean>;
    /**
     * retrieves session state from the current Tap [see device-client.js SessionState](http://developer.iotize.com/reference/typedoc/iotize-device-client.js/0.0.1-alpha.64/interfaces/_device_iotize_device_.sessionstate.html)
     */
    sessionState(): Observable<SessionState>;
    sessionStateForceUpdate(): void;
}
