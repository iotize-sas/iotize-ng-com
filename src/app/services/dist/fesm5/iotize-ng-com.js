import { __decorate, __metadata, __awaiter, __generator, __spread } from 'tslib';
import { BehaviorSubject } from 'rxjs';
import { defineInjectable, Injectable, inject, NgModule } from '@angular/core';
import { BLEComProtocol, BLEScanner } from '@iotize/cordova-plugin-iotize-ble';
import { distinct, map } from 'rxjs/operators';
import { Tap } from '@iotize/device-client.js/device';
import { NFC as NFC$1 } from '@ionic-native/nfc/ngx';
import { NFCComProtocol } from '@iotize/device-com-nfc.cordova';
import { Platform } from '@ionic/angular';
import { NFC } from '@ionic-native/nfc/ngx/index';
import { CommonModule } from '@angular/common';

var IoTizeBle = /** @class */ (function () {
    function IoTizeBle() {
        this.scanner = new BLEScanner();
        this._devicesArray = [];
        this.initObservables();
    }
    Object.defineProperty(IoTizeBle.prototype, "isScanning", {
        /**
         * @returns {boolean} BLE scanner status
         */
        get: function () {
            return this.scanner.isScanning;
        },
        enumerable: true,
        configurable: true
    });
    IoTizeBle.prototype.initObservables = function () {
        var _this = this;
        this.devicesArray$ = new BehaviorSubject([]);
        var observer = {
            next: function (val) {
                _this._devicesArray.push(val);
                _this.devicesArray$.next(_this._devicesArray);
            }
        };
        this.scannerSubscription = this.devices().pipe(distinct(function (_) { return _.address; }) // filtering by address
        ).subscribe(observer);
    };
    IoTizeBle.prototype.startScan = function () {
        this.scanner.start({});
        return this.devices().pipe(distinct(function (_) { return _.address; }));
    };
    IoTizeBle.prototype.checkAvailable = function () {
        return new Promise(function (resolve, reject) {
            iotizeBLE.checkAvailable(function (val) {
                console.log(val);
                val ? resolve() : reject('BlueTooth is not on and ready to use');
            }, function (err) {
                console.error(err);
                reject(err);
            });
        });
    };
    /**
     * Gets an observable that triggers each time a new tap is discovered
     * @return {Observable<DiscoveredDeviceType>}
     */
    IoTizeBle.prototype.devices = function () {
        return this.scanner.devicesObservable();
    };
    IoTizeBle.prototype.devicesArray = function () {
        return this.devicesArray$.asObservable();
    };
    IoTizeBle.prototype.clearDevices = function (except) {
        if (except === void 0) { except = []; }
        this._devicesArray = except;
        this.scannerSubscription.unsubscribe();
        this.initObservables();
    };
    IoTizeBle.prototype.stopScan = function () {
        console.log('Stop Scanning ...');
        this.scanner.stop();
    };
    IoTizeBle.prototype.getProtocol = function (device, options) {
        var deviceAddress = (typeof device !== 'string') ? device.address : device;
        return new BLEComProtocol(deviceAddress, options);
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
    return IoTizeBle;
}());

var IoTizeTap = /** @class */ (function () {
    function IoTizeTap() {
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
    IoTizeTap.prototype.init = function (protocol) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isReady = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.tap = Tap.create();
                        this.sessionSubscription = this.sessionState()
                            .subscribe(function (session) {
                            console.log("session changed");
                            _this.session = session;
                        });
                        console.log('tap created');
                        this.connectionPromise = this.connect(protocol);
                        console.log('waiting for connection promise');
                        return [4 /*yield*/, this.connectionPromise];
                    case 2:
                        _a.sent();
                        console.log('Connected');
                        this.isReady = true;
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('init failed');
                        console.error(error_1);
                        this.isReady = false;
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Connect with the given protocol
     * @param protocol Communication protocol, using BLE,NFC or WiFi, attached to an IoTize Tap
     */
    IoTizeTap.prototype.connect = function (protocol) {
        return this.tap.connect(protocol);
    };
    /**
     * Disconnects from the current tap
     */
    IoTizeTap.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.isReady = false;
                        return [4 /*yield*/, this.tap.disconnect()];
                    case 1:
                        _a.sent();
                        this.clear();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        throw (error_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @returns Promise<string> on the current Tap serial number
     */
    IoTizeTap.prototype.getSerialNumber = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tap.service.device.getSerialNumber()];
                    case 1: return [2 /*return*/, (_a.sent()).body()];
                }
            });
        });
    };
    /**
     * Clears IotizeTap. Sets isReady to false
     */
    IoTizeTap.prototype.clear = function () {
        this.isReady = false;
        if (this.sessionSubscription) {
            this.sessionSubscription.unsubscribe();
        }
        this.tap = null;
    };
    /**
     * Logs on the current Tap with the given credentials, and refresh session state
     * @param user
     * @param password
     * @returns true on login success
     */
    IoTizeTap.prototype.login = function (user, password) {
        return __awaiter(this, void 0, void 0, function () {
            var logSuccess, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('trying to log as ', user);
                        return [4 /*yield*/, this.tap.login(user, password)];
                    case 1:
                        logSuccess = _a.sent();
                        return [2 /*return*/, logSuccess];
                    case 2:
                        error_3 = _a.sent();
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     */
    IoTizeTap.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tap.logout()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, false];
                    case 3:
                        try {
                            return [2 /*return*/, true];
                        }
                        catch (error) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * retrieves session state from the current Tap [see device-client.js SessionState](http://developer.iotize.com/reference/typedoc/iotize-device-client.js/0.0.1-alpha.64/interfaces/_device_iotize_device_.sessionstate.html)
     */
    IoTizeTap.prototype.sessionState = function () {
        return this.tap.sessionState;
    };
    IoTizeTap.prototype.sessionStateForceUpdate = function () {
        this.tap.refreshSessionState();
    };
    IoTizeTap.ngInjectableDef = defineInjectable({ factory: function IoTizeTap_Factory() { return new IoTizeTap(); }, token: IoTizeTap, providedIn: "root" });
    IoTizeTap = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], IoTizeTap);
    return IoTizeTap;
}());

var IoTizeNfc = /** @class */ (function () {
    function IoTizeNfc(nfc, platform) {
        this.nfc = nfc;
        this.platform = platform;
    }
    IoTizeNfc.prototype.startScan = function () {
        var _this = this;
        return this.nfc.addNdefListener(function () {
            console.log('NFC listener ON');
            if (_this.platform.is('ios')) {
                _this.nfc.beginSession();
            }
        }, function (error) {
            console.error('NFC listener didn\'t start: ', error);
        }).pipe(map(function (ndef) { return _this.ndefToDiscoveredDevice(ndef); }));
    };
    IoTizeNfc.prototype.checkAvailable = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.nfc.enabled()];
                    case 1:
                        _a.sent();
                        resolve();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        this.logError(error_1);
                        reject(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    IoTizeNfc.prototype.stopScan = function () {
        return; // no specific way to stop scan
    };
    IoTizeNfc.prototype.getProtocol = function () {
        return new NFCComProtocol();
    };
    IoTizeNfc.prototype.logError = function (error) {
        console.error('[IoTizeNFC] ERROR: ' + error.message ? error.message : error);
    };
    IoTizeNfc.prototype.devicesArray = function () {
        throw new Error("Method not implemented.");
    };
    IoTizeNfc.prototype.clearDevices = function () {
        throw new Error("Method not implemented.");
    };
    IoTizeNfc.prototype.ndefToDiscoveredDevice = function (ndef) {
        console.log(ndef);
        var message = ndef.tag.ndefMessage;
        var appName = String.fromCharCode.apply(String, __spread(message[3].payload));
        var macAddress = this.convertBytesToBLEAddress(message[2].payload);
        var device = {
            name: appName,
            address: macAddress
        };
        console.log(device);
        return device;
    };
    IoTizeNfc.prototype.convertBytesToBLEAddress = function (bytes) {
        return bytes.slice(1)
            .map(function (byte) {
            if (byte < 0) {
                byte += 256;
            }
            var byteString = '0' + byte.toString(16).toUpperCase();
            byteString = byteString.slice(-2);
            return byteString;
        })
            .reverse()
            .join(':');
    };
    IoTizeNfc.ngInjectableDef = defineInjectable({ factory: function IoTizeNfc_Factory() { return new IoTizeNfc(inject(NFC), inject(Platform)); }, token: IoTizeNfc, providedIn: "root" });
    IoTizeNfc = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [NFC$1,
            Platform])
    ], IoTizeNfc);
    return IoTizeNfc;
}());

var IotizeNgComModule = /** @class */ (function () {
    function IotizeNgComModule() {
    }
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
    return IotizeNgComModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { IoTizeBle, IoTizeNfc, IoTizeTap, IotizeNgComModule };
//# sourceMappingURL=iotize-ng-com.js.map
