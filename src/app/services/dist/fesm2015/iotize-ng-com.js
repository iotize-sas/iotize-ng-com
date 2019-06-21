import { __decorate, __metadata, __awaiter } from 'tslib';
import { BehaviorSubject } from 'rxjs';
import { defineInjectable, Injectable, inject, NgModule } from '@angular/core';
import { BLEScanner, BLEComProtocol } from '@iotize/cordova-plugin-iotize-ble';
import { distinct, map } from 'rxjs/operators';
import { Tap } from '@iotize/device-client.js/device';
import { NFC as NFC$1 } from '@ionic-native/nfc/ngx';
import { NFCComProtocol } from '@iotize/device-com-nfc.cordova';
import { Platform } from '@ionic/angular';
import { NFC } from '@ionic-native/nfc/ngx/index';
import { CommonModule } from '@angular/common';

let IoTizeBle = 
/**
 * This class gives access to the IoTize BLE cordova plugin within an injectable angular service
 */
class IoTizeBle {
    constructor() {
        this.scanner = new BLEScanner();
        this._devicesArray = [];
        this.initObservables();
    }
    /**
     * @returns {boolean} BLE scanner status
     */
    get isScanning() {
        return this.scanner.isScanning;
    }
    initObservables() {
        this.devicesArray$ = new BehaviorSubject([]);
        const observer = {
            next: val => {
                this._devicesArray.push(val);
                this.devicesArray$.next(this._devicesArray);
            }
        };
        this.scannerSubscription = this.devices().pipe(distinct(_ => _.address) // filtering by address
        ).subscribe(observer);
    }
    startScan() {
        this.scanner.start({});
        return this.devices().pipe(distinct(_ => _.address));
    }
    checkAvailable() {
        return new Promise((resolve, reject) => {
            iotizeBLE.checkAvailable((val) => {
                console.log(val);
                val ? resolve() : reject('BlueTooth is not on and ready to use');
            }, (err) => {
                console.error(err);
                reject(err);
            });
        });
    }
    /**
     * Gets an observable that triggers each time a new tap is discovered
     * @return {Observable<DiscoveredDeviceType>}
     */
    devices() {
        return this.scanner.devicesObservable();
    }
    devicesArray() {
        return this.devicesArray$.asObservable();
    }
    clearDevices(except = []) {
        this._devicesArray = except;
        this.scannerSubscription.unsubscribe();
        this.initObservables();
    }
    stopScan() {
        console.log('Stop Scanning ...');
        this.scanner.stop();
    }
    getProtocol(device, options) {
        const deviceAddress = (typeof device !== 'string') ? device.address : device;
        return new BLEComProtocol(deviceAddress, options);
    }
};
IoTizeBle.ngInjectableDef = defineInjectable({ factory: function IoTizeBle_Factory() { return new IoTizeBle(); }, token: IoTizeBle, providedIn: "root" });
IoTizeBle = __decorate([
    Injectable({
        providedIn: 'root'
    })
    /**
     * This class gives access to the IoTize BLE cordova plugin within an injectable angular service
     */
    ,
    __metadata("design:paramtypes", [])
], IoTizeBle);

let IoTizeTap = class IoTizeTap {
    constructor() {
        this.isReady = false;
        this.connectionPromise = null;
        this.session = null;
        this.sessionSubscription = null;
    }
    /**
     * Initialize a communication with the given protocol, creating a new .
     * It connects to the Tap and gets the current session state
     * @returns promise resolved on connection success
     * @throws On connection failure, promise is rejected
     * @param protocol Communication protocol, using BLE,NFC or WiFi, attached to an IoTize Tap
     */
    init(protocol) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield this.connectionPromise;
                console.log('Connected');
                this.isReady = true;
            }
            catch (error) {
                console.error('init failed');
                console.error(error);
                this.isReady = false;
                throw error;
            }
        });
    }
    /**
     * Connect with the given protocol
     * @param protocol Communication protocol, using BLE,NFC or WiFi, attached to an IoTize Tap
     */
    connect(protocol) {
        return this.tap.connect(protocol);
    }
    /**
     * Disconnects from the current tap
     */
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.isReady = false;
                yield this.tap.disconnect();
                this.clear();
            }
            catch (error) {
                console.log(error);
                throw (error);
            }
        });
    }
    /**
     * @returns Promise<string> on the current Tap serial number
     */
    getSerialNumber() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.tap.service.device.getSerialNumber()).body();
        });
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
    login(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('trying to log as ', user);
                const logSuccess = yield this.tap.login(user, password);
                return logSuccess;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     */
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.tap.logout();
            }
            catch (error) {
                return false;
            }
            try {
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    /**
     * retrieves session state from the current Tap [see device-client.js SessionState](http://developer.iotize.com/reference/typedoc/iotize-device-client.js/0.0.1-alpha.64/interfaces/_device_iotize_device_.sessionstate.html)
     */
    sessionState() {
        return this.tap.sessionState;
    }
    sessionStateForceUpdate() {
        this.tap.refreshSessionState();
    }
};
IoTizeTap.ngInjectableDef = defineInjectable({ factory: function IoTizeTap_Factory() { return new IoTizeTap(); }, token: IoTizeTap, providedIn: "root" });
IoTizeTap = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [])
], IoTizeTap);

let IoTizeNfc = class IoTizeNfc {
    constructor(nfc, platform) {
        this.nfc = nfc;
        this.platform = platform;
    }
    startScan() {
        return this.nfc.addNdefListener(() => {
            console.log('NFC listener ON');
            if (this.platform.is('ios')) {
                this.nfc.beginSession();
            }
        }, (error) => {
            console.error('NFC listener didn\'t start: ', error);
        }).pipe(map(ndef => this.ndefToDiscoveredDevice(ndef)));
    }
    checkAvailable() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.nfc.enabled();
                resolve();
            }
            catch (error) {
                this.logError(error);
                reject(error);
            }
        }));
    }
    stopScan() {
        return; // no specific way to stop scan
    }
    getProtocol() {
        return new NFCComProtocol();
    }
    logError(error) {
        console.error('[IoTizeNFC] ERROR: ' + error.message ? error.message : error);
    }
    devicesArray() {
        throw new Error("Method not implemented.");
    }
    clearDevices() {
        throw new Error("Method not implemented.");
    }
    ndefToDiscoveredDevice(ndef) {
        console.log(ndef);
        let message = ndef.tag.ndefMessage;
        const appName = String.fromCharCode(...message[3].payload);
        const macAddress = this.convertBytesToBLEAddress(message[2].payload);
        const device = {
            name: appName,
            address: macAddress
        };
        console.log(device);
        return device;
    }
    convertBytesToBLEAddress(bytes) {
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
            .join(':');
    }
};
IoTizeNfc.ngInjectableDef = defineInjectable({ factory: function IoTizeNfc_Factory() { return new IoTizeNfc(inject(NFC), inject(Platform)); }, token: IoTizeNfc, providedIn: "root" });
IoTizeNfc = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [NFC$1,
        Platform])
], IoTizeNfc);

let IotizeNgComModule = class IotizeNgComModule {
};
IotizeNgComModule = __decorate([
    NgModule({
        declarations: [],
        imports: [
            CommonModule
        ],
        providers: [
            IoTizeBle,
            IoTizeNfc,
            IoTizeTap,
            NFC$1
        ]
    })
], IotizeNgComModule);

/**
 * Generated bundle index. Do not edit.
 */

export { IoTizeBle, IoTizeNfc, IoTizeTap, IotizeNgComModule };
//# sourceMappingURL=iotize-ng-com.js.map
