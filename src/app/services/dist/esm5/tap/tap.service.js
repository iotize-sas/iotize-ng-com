import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Tap } from '@iotize/device-client.js/device';
import * as i0 from "@angular/core";
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_2;
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var logSuccess, error_3;
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_4;
            return tslib_1.__generator(this, function (_a) {
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
    IoTizeTap.ngInjectableDef = i0.defineInjectable({ factory: function IoTizeTap_Factory() { return new IoTizeTap(); }, token: IoTizeTap, providedIn: "root" });
    IoTizeTap = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], IoTizeTap);
    return IoTizeTap;
}());
export { IoTizeTap };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pb3RpemUtbmctY29tLyIsInNvdXJjZXMiOlsidGFwL3RhcC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxHQUFHLEVBQWdCLE1BQU0saUNBQWlDLENBQUM7O0FBT3BFO0lBUUU7UUFOQSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRWhCLHNCQUFpQixHQUFrQixJQUFJLENBQUM7UUFDeEMsWUFBTyxHQUFrQixJQUFJLENBQUM7UUFDdEIsd0JBQW1CLEdBQWtCLElBQUksQ0FBQztJQUVsQyxDQUFDO0lBQ2pCOzs7Ozs7T0FNRztJQUNHLHdCQUFJLEdBQVYsVUFBVyxRQUFxQjs7Ozs7Ozt3QkFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Ozs7d0JBRW5CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUN4QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRTs2QkFDM0MsU0FBUyxDQUFDLFVBQUEsT0FBTzs0QkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOzRCQUMvQixLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzt3QkFDekIsQ0FBQyxDQUFDLENBQUM7d0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQzt3QkFDM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQzt3QkFDOUMscUJBQU0sSUFBSSxDQUFDLGlCQUFpQixFQUFBOzt3QkFBNUIsU0FBNEIsQ0FBQzt3QkFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Ozs7d0JBRXBCLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBQzdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBSyxDQUFDLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO3dCQUNyQixNQUFNLE9BQUssQ0FBQzs7Ozs7S0FFZjtJQUVEOzs7T0FHRztJQUVLLDJCQUFPLEdBQWYsVUFBZ0IsUUFBcUI7UUFDbkMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7O09BRUc7SUFDRyw4QkFBVSxHQUFoQjs7Ozs7Ozt3QkFFSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzt3QkFDckIscUJBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBQTs7d0JBQTNCLFNBQTJCLENBQUM7d0JBQzVCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Ozt3QkFFYixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQUssQ0FBQyxDQUFDO3dCQUNuQixNQUFNLENBQUMsT0FBSyxDQUFDLENBQUM7Ozs7O0tBRWpCO0lBRUQ7O09BRUc7SUFDRyxtQ0FBZSxHQUFyQjs7Ozs0QkFDVSxxQkFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLEVBQUE7NEJBQXZELHNCQUFPLENBQUMsU0FBK0MsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFDOzs7O0tBQ2pFO0lBRUQ7O09BRUc7SUFDSCx5QkFBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDNUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0cseUJBQUssR0FBWCxVQUFZLElBQVksRUFBRSxRQUFnQjs7Ozs7Ozt3QkFFdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDcEIscUJBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFBOzt3QkFBakQsVUFBVSxHQUFHLFNBQW9DO3dCQUN2RCxzQkFBTyxVQUFVLEVBQUM7Ozt3QkFFbEIsTUFBTSxPQUFLLENBQUM7Ozs7O0tBRWY7SUFDRjtPQUNHO0lBQ0ksMEJBQU0sR0FBWjs7Ozs7Ozt3QkFFSSxxQkFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFBOzt3QkFBdkIsU0FBdUIsQ0FBQzs7Ozt3QkFFeEIsc0JBQU8sS0FBSyxFQUFDOzt3QkFFZixJQUFJOzRCQUNGLHNCQUFPLElBQUksRUFBQzt5QkFDYjt3QkFBQyxPQUFPLEtBQUssRUFBRTs0QkFDZCxzQkFBTyxLQUFLLEVBQUM7eUJBQ2Q7Ozs7O0tBQ0Y7SUFFRDs7T0FFRztJQUVILGdDQUFZLEdBQVo7UUFDRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO0lBQy9CLENBQUM7SUFFRCwyQ0FBdUIsR0FBdkI7UUFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDakMsQ0FBQzs7SUF4SFUsU0FBUztRQUhyQixVQUFVLENBQUM7WUFDVixVQUFVLEVBQUUsTUFBTTtTQUNuQixDQUFDOztPQUNXLFNBQVMsQ0F5SHJCO29CQWpJRDtDQWlJQyxBQXpIRCxJQXlIQztTQXpIWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUYXAsIFNlc3Npb25TdGF0ZSB9IGZyb20gJ0Bpb3RpemUvZGV2aWNlLWNsaWVudC5qcy9kZXZpY2UnO1xyXG5pbXBvcnQgeyBDb21Qcm90b2NvbCB9IGZyb20gJ0Bpb3RpemUvZGV2aWNlLWNsaWVudC5qcy9wcm90b2NvbC9hcGknO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIElvVGl6ZVRhcCB7XHJcblxyXG4gIGlzUmVhZHkgPSBmYWxzZTtcclxuICB0YXA6IFRhcDtcclxuICBjb25uZWN0aW9uUHJvbWlzZT86IFByb21pc2U8YW55PiA9IG51bGw7XHJcbiAgc2Vzc2lvbj86IFNlc3Npb25TdGF0ZSA9IG51bGw7XHJcbiAgcHJpdmF0ZSBzZXNzaW9uU3Vic2NyaXB0aW9uPzogU3Vic2NyaXB0aW9uID0gbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIGEgY29tbXVuaWNhdGlvbiB3aXRoIHRoZSBnaXZlbiBwcm90b2NvbCwgY3JlYXRpbmcgYSBuZXcgLlxyXG4gICAqIEl0IGNvbm5lY3RzIHRvIHRoZSBUYXAgYW5kIGdldHMgdGhlIGN1cnJlbnQgc2Vzc2lvbiBzdGF0ZVxyXG4gICAqIEByZXR1cm5zIHByb21pc2UgcmVzb2x2ZWQgb24gY29ubmVjdGlvbiBzdWNjZXNzXHJcbiAgICogQHRocm93cyBPbiBjb25uZWN0aW9uIGZhaWx1cmUsIHByb21pc2UgaXMgcmVqZWN0ZWRcclxuICAgKiBAcGFyYW0gcHJvdG9jb2wgQ29tbXVuaWNhdGlvbiBwcm90b2NvbCwgdXNpbmcgQkxFLE5GQyBvciBXaUZpLCBhdHRhY2hlZCB0byBhbiBJb1RpemUgVGFwXHJcbiAgICovXHJcbiAgYXN5bmMgaW5pdChwcm90b2NvbDogQ29tUHJvdG9jb2wpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgdGhpcy50YXAgPSBUYXAuY3JlYXRlKCk7XHJcbiAgICAgIHRoaXMuc2Vzc2lvblN1YnNjcmlwdGlvbiA9IHRoaXMuc2Vzc2lvblN0YXRlKClcclxuICAgICAgICAuc3Vic2NyaWJlKHNlc3Npb24gPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJzZXNzaW9uIGNoYW5nZWRcIik7XHJcbiAgICAgICAgICB0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICBjb25zb2xlLmxvZygndGFwIGNyZWF0ZWQnKTtcclxuICAgICAgdGhpcy5jb25uZWN0aW9uUHJvbWlzZSA9IHRoaXMuY29ubmVjdChwcm90b2NvbCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCd3YWl0aW5nIGZvciBjb25uZWN0aW9uIHByb21pc2UnKTtcclxuICAgICAgYXdhaXQgdGhpcy5jb25uZWN0aW9uUHJvbWlzZTtcclxuICAgICAgY29uc29sZS5sb2coJ0Nvbm5lY3RlZCcpO1xyXG4gICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignaW5pdCBmYWlsZWQnKTtcclxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbm5lY3Qgd2l0aCB0aGUgZ2l2ZW4gcHJvdG9jb2xcclxuICAgKiBAcGFyYW0gcHJvdG9jb2wgQ29tbXVuaWNhdGlvbiBwcm90b2NvbCwgdXNpbmcgQkxFLE5GQyBvciBXaUZpLCBhdHRhY2hlZCB0byBhbiBJb1RpemUgVGFwXHJcbiAgICovXHJcblxyXG4gIHByaXZhdGUgY29ubmVjdChwcm90b2NvbDogQ29tUHJvdG9jb2wpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLnRhcC5jb25uZWN0KHByb3RvY29sKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc2Nvbm5lY3RzIGZyb20gdGhlIGN1cnJlbnQgdGFwXHJcbiAgICovXHJcbiAgYXN5bmMgZGlzY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xyXG4gICAgICBhd2FpdCB0aGlzLnRhcC5kaXNjb25uZWN0KCk7XHJcbiAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgdGhyb3cgKGVycm9yKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nPiBvbiB0aGUgY3VycmVudCBUYXAgc2VyaWFsIG51bWJlclxyXG4gICAqL1xyXG4gIGFzeW5jIGdldFNlcmlhbE51bWJlcigpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLnRhcC5zZXJ2aWNlLmRldmljZS5nZXRTZXJpYWxOdW1iZXIoKSkuYm9keSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXJzIElvdGl6ZVRhcC4gU2V0cyBpc1JlYWR5IHRvIGZhbHNlXHJcbiAgICovXHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLmlzUmVhZHkgPSBmYWxzZTtcclxuICAgIGlmICh0aGlzLnNlc3Npb25TdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5zZXNzaW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnRhcCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBMb2dzIG9uIHRoZSBjdXJyZW50IFRhcCB3aXRoIHRoZSBnaXZlbiBjcmVkZW50aWFscywgYW5kIHJlZnJlc2ggc2Vzc2lvbiBzdGF0ZVxyXG4gICAqIEBwYXJhbSB1c2VyXHJcbiAgICogQHBhcmFtIHBhc3N3b3JkXHJcbiAgICogQHJldHVybnMgdHJ1ZSBvbiBsb2dpbiBzdWNjZXNzXHJcbiAgICovXHJcbiAgYXN5bmMgbG9naW4odXNlcjogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zb2xlLmxvZygndHJ5aW5nIHRvIGxvZyBhcyAnLCB1c2VyKTtcclxuICAgICAgY29uc3QgbG9nU3VjY2VzcyA9IGF3YWl0IHRoaXMudGFwLmxvZ2luKHVzZXIsIHBhc3N3b3JkKTtcclxuICAgICAgcmV0dXJuIGxvZ1N1Y2Nlc3M7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9XHJcbiAvKipcclxuICAqL1xyXG4gIGFzeW5jIGxvZ291dCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IHRoaXMudGFwLmxvZ291dCgpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiByZXRyaWV2ZXMgc2Vzc2lvbiBzdGF0ZSBmcm9tIHRoZSBjdXJyZW50IFRhcCBbc2VlIGRldmljZS1jbGllbnQuanMgU2Vzc2lvblN0YXRlXShodHRwOi8vZGV2ZWxvcGVyLmlvdGl6ZS5jb20vcmVmZXJlbmNlL3R5cGVkb2MvaW90aXplLWRldmljZS1jbGllbnQuanMvMC4wLjEtYWxwaGEuNjQvaW50ZXJmYWNlcy9fZGV2aWNlX2lvdGl6ZV9kZXZpY2VfLnNlc3Npb25zdGF0ZS5odG1sKVxyXG4gICAqL1xyXG5cclxuICBzZXNzaW9uU3RhdGUoKTogT2JzZXJ2YWJsZTxTZXNzaW9uU3RhdGU+IHtcclxuICAgIHJldHVybiB0aGlzLnRhcC5zZXNzaW9uU3RhdGU7XHJcbiAgfVxyXG5cclxuICBzZXNzaW9uU3RhdGVGb3JjZVVwZGF0ZSgpIHtcclxuICAgIHRoaXMudGFwLnJlZnJlc2hTZXNzaW9uU3RhdGUoKTtcclxuICB9XHJcbn1cclxuIl19