import { Injectable } from '@angular/core';
import { Tap, SessionState } from '@iotize/device-client.js/device';
import { ComProtocol } from '@iotize/device-client.js/protocol/api';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IoTizeTap {

  isReady = false;
  tap: Tap;
  connectionPromise?: Promise<any> = null;
  session?: SessionState = null;

  get isLogged(): boolean {
    if (this.session) {
      return this.session.name !== 'anonymous';
    }
    return false;
  }

  constructor(public events: Events) { }
  /**
   * Initialize a communication with the given protocol, creating a new .
   * It connects to the Tap and gets the current session state
   * @returns promise resolved on connection success
   * @event **connected** Ionic event triggered on connection success
   * @throws On connection failure, promise is rejected
   * @param protocol Communication protocol, using BLE,NFC or WiFi, attached to an IoTize Tap
   */
  async init(protocol: ComProtocol): Promise<void> {
    this.isReady = false;
    try {
      this.tap = Tap.create();
      console.log('tap created');
      this.connectionPromise = this.connect(protocol);
      console.log('waiting for connection promise');
      await this.connectionPromise;
      await this.checkSessionState();
      this.isReady = true;
      this.events.publish('connected');
    } catch (error) {
      console.error('init failed');
      console.error(error);
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
   * @event disconnected published on tap disconnection
   */
  async disconnect(): Promise<void> {
    try {
      this.isReady = false;
      await this.tap.disconnect();
      await this.checkSessionState();
      this.events.publish('disconnected');
    } catch (error) {
      console.log(error);
      this.events.publish('disconnected');
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
    this.tap = null;
  }

  /**
   * Logs on the current Tap with the given credentials
   * @param user
   * @param password
   * @event logged-in triggered on user authentication
   * @event logged-out triggered on user log out
   * @returns true on login success
   */
  async login(user: string, password: string): Promise<boolean> {
    try {
      console.log('trying to log as ', user);
      const logSuccess = await this.tap.login(user, password, false);
      if (logSuccess) {
        await this.checkSessionState();
      }
      return logSuccess;
    } catch (error) {
      throw error;
    }
  }
 /**
  * @event logged-in triggered on user authentication
  * @event logged-out triggered on user log out
  */
  async logout(): Promise<boolean> {
    try {
      await this.tap.logout();
    } catch (error) {
      return false;
    }
    try {
      await this.checkSessionState();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * retrieves session state from the current Tap [see device-client.js SessionState](http://developer.iotize.com/reference/typedoc/iotize-device-client.js/0.0.1-alpha.64/interfaces/_device_iotize_device_.sessionstate.html)
   */

  async checkSessionState() {
    if (!this.tap.isConnected()) {
      this.session = null;
      return;
    }
    const previouslyConnectedProfile = this.session? this.session.name : '';
    this.session = await this.tap.refreshSessionState();
    if (previouslyConnectedProfile !== ''){ // not the first sessionState
      if (this.session.name === 'anonymous') {
        this.events.publish('logged-out');
      } else if (previouslyConnectedProfile !== this.session.name){
        this.events.publish('logged-in', this.session.name);
      }
    } 
  }
}
