import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { NFC } from "@ionic-native/nfc/ngx";
import { map } from "rxjs/operators";
import { NFCComProtocol } from '@iotize/device-com-nfc.cordova';
import { Platform } from '@ionic/angular';
import * as i0 from "@angular/core";
import * as i1 from "@ionic-native/nfc/ngx/index";
import * as i2 from "@ionic/angular";
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
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var error_1;
            return tslib_1.__generator(this, function (_a) {
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
        var appName = String.fromCharCode.apply(String, tslib_1.__spread(message[3].payload));
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
    IoTizeNfc.ngInjectableDef = i0.defineInjectable({ factory: function IoTizeNfc_Factory() { return new IoTizeNfc(i0.inject(i1.NFC), i0.inject(i2.Platform)); }, token: IoTizeNfc, providedIn: "root" });
    IoTizeNfc = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [NFC,
            Platform])
    ], IoTizeNfc);
    return IoTizeNfc;
}());
export { IoTizeNfc };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmZjLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pb3RpemUtbmctY29tLyIsInNvdXJjZXMiOlsibmZjL25mYy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxHQUFHLEVBQWEsTUFBTSx1QkFBdUIsQ0FBQztBQUd2RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFFcEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFBO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUsxQztJQUVFLG1CQUFtQixHQUFRLEVBQ2pCLFFBQWtCO1FBRFQsUUFBRyxHQUFILEdBQUcsQ0FBSztRQUNqQixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQUksQ0FBQztJQUVqQyw2QkFBUyxHQUFUO1FBQUEsaUJBWUM7UUFYQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtZQUM5QixJQUFJLEtBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMzQixLQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxFQUNDLFVBQUMsS0FBSztZQUNKLE9BQU8sQ0FBQyxLQUFLLENBQUMsOEJBQThCLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDdEQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNMLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsRUFBakMsQ0FBaUMsQ0FBQyxDQUMvQyxDQUFDO0lBQ04sQ0FBQztJQUVELGtDQUFjLEdBQWQ7UUFBQSxpQkFVQztRQVRDLE9BQU8sSUFBSSxPQUFPLENBQU8sVUFBTyxPQUFPLEVBQUUsTUFBTTs7Ozs7O3dCQUUzQyxxQkFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFBOzt3QkFBeEIsU0FBd0IsQ0FBQzt3QkFDekIsT0FBTyxFQUFFLENBQUM7Ozs7d0JBRVYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFLLENBQUMsQ0FBQzt3QkFDckIsTUFBTSxDQUFDLE9BQUssQ0FBQyxDQUFDOzs7OzthQUVqQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsNEJBQVEsR0FBUjtRQUNFLE9BQU8sQ0FBQywrQkFBK0I7SUFDekMsQ0FBQztJQUNELCtCQUFXLEdBQVg7UUFDRSxPQUFPLElBQUksY0FBYyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELDRCQUFRLEdBQVIsVUFBUyxLQUFLO1FBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQsZ0NBQVksR0FBWjtRQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0QsZ0NBQVksR0FBWjtRQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU8sMENBQXNCLEdBQTlCLFVBQStCLElBQWU7UUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztRQUNuQyxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxPQUFuQixNQUFNLG1CQUFpQixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFDLENBQUM7UUFDM0QsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRSxJQUFNLE1BQU0sR0FBeUI7WUFDbkMsSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsVUFBVTtTQUNwQixDQUFDO1FBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRU8sNENBQXdCLEdBQWhDLFVBQWlDLEtBQWU7UUFDOUMsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNsQixHQUFHLENBQUMsVUFBQSxJQUFJO1lBQ1AsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO2dCQUNaLElBQUksSUFBSSxHQUFHLENBQUM7YUFDYjtZQUNELElBQUksVUFBVSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZELFVBQVUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsT0FBTyxVQUFVLENBQUM7UUFDcEIsQ0FBQyxDQUFDO2FBQ0QsT0FBTyxFQUFFO2FBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ2QsQ0FBQzs7SUF6RVUsU0FBUztRQUhyQixVQUFVLENBQUM7WUFDVixVQUFVLEVBQUUsTUFBTTtTQUNuQixDQUFDO2lEQUd3QixHQUFHO1lBQ1AsUUFBUTtPQUhqQixTQUFTLENBMEVyQjtvQkF0RkQ7Q0FzRkMsQUExRUQsSUEwRUM7U0ExRVksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkZDLCBOZGVmRXZlbnQgfSBmcm9tIFwiQGlvbmljLW5hdGl2ZS9uZmMvbmd4XCI7XHJcbmltcG9ydCB7IElvVGl6ZUNvbVNlcnZpY2UsIERpc2NvdmVyZWREZXZpY2VUeXBlIH0gZnJvbSBcIi4uL2NvbS1zZXJ2aWNlLWludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCJcclxuaW1wb3J0IHsgQ29tUHJvdG9jb2wgfSBmcm9tICdAaW90aXplL2RldmljZS1jbGllbnQuanMvcHJvdG9jb2wvYXBpJztcclxuaW1wb3J0IHsgTkZDQ29tUHJvdG9jb2wgfSBmcm9tICdAaW90aXplL2RldmljZS1jb20tbmZjLmNvcmRvdmEnXHJcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgSW9UaXplTmZjIGltcGxlbWVudHMgSW9UaXplQ29tU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZmM6IE5GQyxcclxuICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtKSB7IH1cclxuXHJcbiAgc3RhcnRTY2FuKCk6IE9ic2VydmFibGU8RGlzY292ZXJlZERldmljZVR5cGU+IHtcclxuICAgIHJldHVybiB0aGlzLm5mYy5hZGROZGVmTGlzdGVuZXIoKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnTkZDIGxpc3RlbmVyIE9OJylcclxuICAgICAgaWYgKHRoaXMucGxhdGZvcm0uaXMoJ2lvcycpKSB7XHJcbiAgICAgICAgdGhpcy5uZmMuYmVnaW5TZXNzaW9uKCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ05GQyBsaXN0ZW5lciBkaWRuXFwndCBzdGFydDogJywgZXJyb3IpXHJcbiAgICAgIH0pLnBpcGUoXHJcbiAgICAgICAgbWFwKG5kZWYgPT4gdGhpcy5uZGVmVG9EaXNjb3ZlcmVkRGV2aWNlKG5kZWYpKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tBdmFpbGFibGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMubmZjLmVuYWJsZWQoKTtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgdGhpcy5sb2dFcnJvcihlcnJvcik7XHJcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHN0b3BTY2FuKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuOyAvLyBubyBzcGVjaWZpYyB3YXkgdG8gc3RvcCBzY2FuXHJcbiAgfVxyXG4gIGdldFByb3RvY29sKCk6IENvbVByb3RvY29sIHtcclxuICAgIHJldHVybiBuZXcgTkZDQ29tUHJvdG9jb2woKTtcclxuICB9XHJcblxyXG4gIGxvZ0Vycm9yKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdbSW9UaXplTkZDXSBFUlJPUjogJyArIGVycm9yLm1lc3NhZ2UgPyBlcnJvci5tZXNzYWdlIDogZXJyb3IpO1xyXG4gIH1cclxuXHJcbiAgZGV2aWNlc0FycmF5KCk6IE9ic2VydmFibGU8RGlzY292ZXJlZERldmljZVR5cGVbXT4ge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XHJcbiAgfVxyXG4gIGNsZWFyRGV2aWNlcygpOiB2b2lkIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCBub3QgaW1wbGVtZW50ZWQuXCIpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBuZGVmVG9EaXNjb3ZlcmVkRGV2aWNlKG5kZWY6IE5kZWZFdmVudCk6IERpc2NvdmVyZWREZXZpY2VUeXBlIHtcclxuICAgIGNvbnNvbGUubG9nKG5kZWYpO1xyXG4gICAgbGV0IG1lc3NhZ2UgPSBuZGVmLnRhZy5uZGVmTWVzc2FnZTtcclxuICAgIGNvbnN0IGFwcE5hbWUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKC4uLm1lc3NhZ2VbM10ucGF5bG9hZCk7XHJcbiAgICBjb25zdCBtYWNBZGRyZXNzID0gdGhpcy5jb252ZXJ0Qnl0ZXNUb0JMRUFkZHJlc3MobWVzc2FnZVsyXS5wYXlsb2FkKTtcclxuICAgIGNvbnN0IGRldmljZTogRGlzY292ZXJlZERldmljZVR5cGUgPSB7XHJcbiAgICAgIG5hbWU6IGFwcE5hbWUsXHJcbiAgICAgIGFkZHJlc3M6IG1hY0FkZHJlc3NcclxuICAgIH07XHJcbiAgICBjb25zb2xlLmxvZyhkZXZpY2UpO1xyXG4gICAgcmV0dXJuIGRldmljZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29udmVydEJ5dGVzVG9CTEVBZGRyZXNzKGJ5dGVzOiBudW1iZXJbXSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYnl0ZXMuc2xpY2UoMSlcclxuICAgICAgLm1hcChieXRlID0+IHtcclxuICAgICAgICBpZiAoYnl0ZSA8IDApIHtcclxuICAgICAgICAgIGJ5dGUgKz0gMjU2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYnl0ZVN0cmluZyA9ICcwJyArIGJ5dGUudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgYnl0ZVN0cmluZyA9IGJ5dGVTdHJpbmcuc2xpY2UoLTIpO1xyXG4gICAgICAgIHJldHVybiBieXRlU3RyaW5nO1xyXG4gICAgICB9KVxyXG4gICAgICAucmV2ZXJzZSgpXHJcbiAgICAgIC5qb2luKCc6JylcclxuICB9XHJcbn1cclxuIl19