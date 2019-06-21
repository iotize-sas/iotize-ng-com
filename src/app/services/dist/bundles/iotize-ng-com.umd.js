(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('@angular/core'), require('@iotize/cordova-plugin-iotize-ble'), require('rxjs/operators'), require('@iotize/device-client.js/device'), require('@ionic-native/nfc/ngx'), require('@iotize/device-com-nfc.cordova'), require('@ionic/angular'), require('@ionic-native/nfc/ngx/index'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('iotize-ng-com', ['exports', 'rxjs', '@angular/core', '@iotize/cordova-plugin-iotize-ble', 'rxjs/operators', '@iotize/device-client.js/device', '@ionic-native/nfc/ngx', '@iotize/device-com-nfc.cordova', '@ionic/angular', '@ionic-native/nfc/ngx/index', '@angular/common'], factory) :
    (global = global || self, factory(global['iotize-ng-com'] = {}, global.rxjs, global.ng.core, global.cordovaPluginIotizeBle, global.rxjs.operators, global.device, global.ngx, global.deviceComNfc_cordova, global.angular, global.index, global.ng.common));
}(this, function (exports, rxjs, core, cordovaPluginIotizeBle, operators, device, ngx, deviceComNfc_cordova, angular, index, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    var IoTizeBle = /** @class */ (function () {
        function IoTizeBle() {
            this.scanner = new cordovaPluginIotizeBle.BLEScanner();
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
            this.devicesArray$ = new rxjs.BehaviorSubject([]);
            var observer = {
                next: function (val) {
                    _this._devicesArray.push(val);
                    _this.devicesArray$.next(_this._devicesArray);
                }
            };
            this.scannerSubscription = this.devices().pipe(operators.distinct(function (_) { return _.address; }) // filtering by address
            ).subscribe(observer);
        };
        IoTizeBle.prototype.startScan = function () {
            this.scanner.start({});
            return this.devices().pipe(operators.distinct(function (_) { return _.address; }));
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
            return new cordovaPluginIotizeBle.BLEComProtocol(deviceAddress, options);
        };
        IoTizeBle.ngInjectableDef = core.defineInjectable({ factory: function IoTizeBle_Factory() { return new IoTizeBle(); }, token: IoTizeBle, providedIn: "root" });
        IoTizeBle = __decorate([
            core.Injectable({
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
                            this.tap = device.Tap.create();
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
        IoTizeTap.ngInjectableDef = core.defineInjectable({ factory: function IoTizeTap_Factory() { return new IoTizeTap(); }, token: IoTizeTap, providedIn: "root" });
        IoTizeTap = __decorate([
            core.Injectable({
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
            }).pipe(operators.map(function (ndef) { return _this.ndefToDiscoveredDevice(ndef); }));
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
            return new deviceComNfc_cordova.NFCComProtocol();
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
        IoTizeNfc.ngInjectableDef = core.defineInjectable({ factory: function IoTizeNfc_Factory() { return new IoTizeNfc(core.inject(index.NFC), core.inject(angular.Platform)); }, token: IoTizeNfc, providedIn: "root" });
        IoTizeNfc = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __metadata("design:paramtypes", [ngx.NFC,
                angular.Platform])
        ], IoTizeNfc);
        return IoTizeNfc;
    }());

    var IotizeNgComModule = /** @class */ (function () {
        function IotizeNgComModule() {
        }
        IotizeNgComModule = __decorate([
            core.NgModule({
                declarations: [],
                imports: [
                    common.CommonModule
                ],
                providers: [
                    IoTizeBle,
                    IoTizeNfc,
                    IoTizeTap,
                    ngx.NFC
                ]
            })
        ], IotizeNgComModule);
        return IotizeNgComModule;
    }());

    exports.IoTizeBle = IoTizeBle;
    exports.IoTizeNfc = IoTizeNfc;
    exports.IoTizeTap = IoTizeTap;
    exports.IotizeNgComModule = IotizeNgComModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=iotize-ng-com.umd.js.map
