import { Injectable } from '@angular/core';
import { Tap, SessionState } from '@iotize/device-client.js/device';
import { ComProtocol } from '@iotize/device-client.js/protocol/api';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IoTizeTap {

  isReady = false;
  tap: Tap;
  connectionPromise?: Promise<any> = null;
  session?: SessionState = null;
  private sessionSubscription?: Subscription = null;

  constructor() { }
  /**
   * Initialize a communication with the given protocol, creating a new .
   * It connects to the Tap and gets the current session state
   * @returns promise resolved on connection success
   * @throws On connection failure, promise is rejected
   * @param protocol Communication protocol, using BLE,NFC or WiFi, attached to an IoTize Tap
   */
  async init(protocol: ComProtocol): Promise<void> {
    this.isReady = false;
    try {
      this.tap = Tap.create();
      this.sessionSubscription = this.sessionState()
        .subscribe(session => {
          console.log("session changed");
          this.session = session;
        });
      console.log('tap created');
      this.connectionPromise = this.connect(protocol);
      console.log('waiting for connection promise');
      await this.connectionPromise;
      console.log('Connected');
      this.isReady = true;
    } catch (error) {
      console.error('init failed');
      console.error(error);
      this.isReady = false;
      throw new Error('Connection Failed: ' + (error.message? error.message : error));
    }
  }

  /**
   * Connect with the given protocol
   * @param protocol Communication protocol, using BLE,NFC or WiFi, attached to an IoTize Tap
   */

  private connect(protocol: ComProtocol): Promise<void> {
    return this.tap.connect(protocol);
  }

  /**
   * Disconnects from the current tap
   */
  async disconnect(): Promise<void> {
    try {
      this.isReady = false;
      await this.tap.disconnect();
      this.clear();
    } catch (error) {
      console.log(error);
      throw (error);
    }
  }

  /**
   * @returns Promise<string> on the current Tap serial number
   */
  async getSerialNumber(): Promise<string> {
    return (await this.tap.service.device.getSerialNumber()).body();
  }

  /**
   * Clears IotizeTap. Sets isReady to false
   */
  clear() {
    this.isReady = false;
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
    this.tap = null;
  }

  /**
   * Logs on the current Tap with the given credentials, and refresh session state
   * @param user
   * @param password
   * @returns true on login success
   */
  async login(user: string, password: string): Promise<boolean> {
    try {
      console.log('trying to log as ', user);
      const logSuccess = await this.tap.login(user, password);
      return logSuccess;
    } catch (error) {
      throw error;
    }
  }
 /**
  */
  async logout(): Promise<boolean> {
    try {
      await this.tap.logout();
    } catch (error) {
      return false;
    }
    try {
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * retrieves session state from the current Tap [see device-client.js SessionState](http://developer.iotize.com/reference/typedoc/iotize-device-client.js/0.0.1-alpha.64/interfaces/_device_iotize_device_.sessionstate.html)
   */

  sessionState(): Observable<SessionState> {
    return this.tap.sessionState;
  }

  sessionStateForceUpdate() {
    this.tap.refreshSessionState();
  }
}
