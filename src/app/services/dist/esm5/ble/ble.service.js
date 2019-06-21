import * as tslib_1 from "tslib";
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { BLEComProtocol, BLEScanner } from '@iotize/cordova-plugin-iotize-ble';
import { distinct } from "rxjs/operators";
import * as i0 from "@angular/core";
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
    IoTizeBle.ngInjectableDef = i0.defineInjectable({ factory: function IoTizeBle_Factory() { return new IoTizeBle(); }, token: IoTizeBle, providedIn: "root" });
    IoTizeBle = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
        /**
         * This class gives access to the IoTize BLE cordova plugin within an injectable angular service
         */
        ,
        tslib_1.__metadata("design:paramtypes", [])
    ], IoTizeBle);
    return IoTizeBle;
}());
export { IoTizeBle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pb3RpemUtbmctY29tLyIsInNvdXJjZXMiOlsiYmxlL2JsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQTZDLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFHL0UsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQVcxQztJQVlFO1FBVlEsWUFBTyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFFM0Isa0JBQWEsR0FBNEIsRUFBRSxDQUFDO1FBU2xELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBTEQsc0JBQUksaUNBQVU7UUFIZDs7V0FFRzthQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUNqQyxDQUFDOzs7T0FBQTtJQUtPLG1DQUFlLEdBQXZCO1FBQUEsaUJBV0M7UUFWQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksZUFBZSxDQUF5QixFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFNLFFBQVEsR0FBMEM7WUFDdEQsSUFBSSxFQUFFLFVBQUEsR0FBRztnQkFDUCxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDN0IsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzlDLENBQUM7U0FDRixDQUFBO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQzVDLFFBQVEsQ0FBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLEVBQVQsQ0FBUyxDQUFDLENBQUMsdUJBQXVCO1NBQ2xELENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFRCw2QkFBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUN4QixRQUFRLENBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsT0FBTyxFQUFULENBQVMsQ0FBQyxDQUMxQixDQUFDO0lBQ0osQ0FBQztJQUVELGtDQUFjLEdBQWQ7UUFDRSxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxVQUFDLEdBQUc7Z0JBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1lBQ25FLENBQUMsRUFDQyxVQUFDLEdBQUc7Z0JBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFFSCwyQkFBTyxHQUFQO1FBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELGdDQUFZLEdBQVo7UUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELGdDQUFZLEdBQVosVUFBYSxNQUFtQztRQUFuQyx1QkFBQSxFQUFBLFdBQW1DO1FBQzlDLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1FBQzVCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELDRCQUFRLEdBQVI7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUgsK0JBQVcsR0FBWCxVQUFZLE1BQXFDLEVBQUUsT0FBNEI7UUFDN0UsSUFBTSxhQUFhLEdBQUcsQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzdFLE9BQU8sSUFBSSxjQUFjLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BELENBQUM7O0lBNUVVLFNBQVM7UUFOckIsVUFBVSxDQUFDO1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztRQUNGOztXQUVHOzs7T0FDVSxTQUFTLENBNkVyQjtvQkE3RkQ7Q0E2RkMsQUE3RUQsSUE2RUM7U0E3RVksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgUGFydGlhbE9ic2VydmVyLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCTEVDb21Qcm90b2NvbCwgQkxFU2Nhbm5lciB9IGZyb20gJ0Bpb3RpemUvY29yZG92YS1wbHVnaW4taW90aXplLWJsZSc7XHJcbmltcG9ydCB7IENvbVByb3RvY29sLCBDb21Qcm90b2NvbE9wdGlvbnMgfSBmcm9tICdAaW90aXplL2RldmljZS1jbGllbnQuanMvcHJvdG9jb2wvYXBpJztcclxuaW1wb3J0IHsgSW9UaXplQ29tU2VydmljZSwgRGlzY292ZXJlZERldmljZVR5cGUgfSBmcm9tIFwiLi4vY29tLXNlcnZpY2UtaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IGRpc3RpbmN0IH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XHJcblxyXG5kZWNsYXJlIHZhciBpb3RpemVCTEU6IGFueTtcclxuXHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGdpdmVzIGFjY2VzcyB0byB0aGUgSW9UaXplIEJMRSBjb3Jkb3ZhIHBsdWdpbiB3aXRoaW4gYW4gaW5qZWN0YWJsZSBhbmd1bGFyIHNlcnZpY2VcclxuICovXHJcbmV4cG9ydCBjbGFzcyBJb1RpemVCbGUgaW1wbGVtZW50cyBJb1RpemVDb21TZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBzY2FubmVyID0gbmV3IEJMRVNjYW5uZXIoKTtcclxuICBwcml2YXRlIGRldmljZXNBcnJheSQ6IEJlaGF2aW9yU3ViamVjdDxEaXNjb3ZlcmVkRGV2aWNlVHlwZVtdPjtcclxuICBwcml2YXRlIF9kZXZpY2VzQXJyYXkgOiBEaXNjb3ZlcmVkRGV2aWNlVHlwZVtdID0gW107XHJcbiAgcHJpdmF0ZSBzY2FubmVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgLyoqXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IEJMRSBzY2FubmVyIHN0YXR1c1xyXG4gICAqL1xyXG4gIGdldCBpc1NjYW5uaW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2Nhbm5lci5pc1NjYW5uaW5nO1xyXG4gIH1cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuaW5pdE9ic2VydmFibGVzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRPYnNlcnZhYmxlcygpIHtcclxuICAgIHRoaXMuZGV2aWNlc0FycmF5JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGlzY292ZXJlZERldmljZVR5cGVbXT4oW10pO1xyXG4gICAgY29uc3Qgb2JzZXJ2ZXI6IFBhcnRpYWxPYnNlcnZlcjxEaXNjb3ZlcmVkRGV2aWNlVHlwZT4gPSB7XHJcbiAgICAgIG5leHQ6IHZhbCA9PiB7XHJcbiAgICAgICAgdGhpcy5fZGV2aWNlc0FycmF5LnB1c2godmFsKTtcclxuICAgICAgICB0aGlzLmRldmljZXNBcnJheSQubmV4dCh0aGlzLl9kZXZpY2VzQXJyYXkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnNjYW5uZXJTdWJzY3JpcHRpb24gPSB0aGlzLmRldmljZXMoKS5waXBlKFxyXG4gICAgICBkaXN0aW5jdCggXyA9PiBfLmFkZHJlc3MpIC8vIGZpbHRlcmluZyBieSBhZGRyZXNzXHJcbiAgICApLnN1YnNjcmliZShvYnNlcnZlcilcclxuICB9XHJcblxyXG4gIHN0YXJ0U2NhbigpOiBPYnNlcnZhYmxlPERpc2NvdmVyZWREZXZpY2VUeXBlPiB7XHJcbiAgICB0aGlzLnNjYW5uZXIuc3RhcnQoe30pO1xyXG4gICAgcmV0dXJuIHRoaXMuZGV2aWNlcygpLnBpcGUoXHJcbiAgICAgIGRpc3RpbmN0KCBfID0+IF8uYWRkcmVzcylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjaGVja0F2YWlsYWJsZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGlvdGl6ZUJMRS5jaGVja0F2YWlsYWJsZSgodmFsKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2codmFsKTtcclxuICAgICAgICB2YWwgPyByZXNvbHZlKCkgOiByZWplY3QoJ0JsdWVUb290aCBpcyBub3Qgb24gYW5kIHJlYWR5IHRvIHVzZScpO1xyXG4gICAgICB9LFxyXG4gICAgICAgIChlcnIpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIGFuIG9ic2VydmFibGUgdGhhdCB0cmlnZ2VycyBlYWNoIHRpbWUgYSBuZXcgdGFwIGlzIGRpc2NvdmVyZWRcclxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPERpc2NvdmVyZWREZXZpY2VUeXBlPn1cclxuICAgKi9cclxuXHJcbiAgZGV2aWNlcygpOiBPYnNlcnZhYmxlPERpc2NvdmVyZWREZXZpY2VUeXBlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5zY2FubmVyLmRldmljZXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICBkZXZpY2VzQXJyYXkoKTogT2JzZXJ2YWJsZTxEaXNjb3ZlcmVkRGV2aWNlVHlwZVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5kZXZpY2VzQXJyYXkkLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJEZXZpY2VzKGV4Y2VwdDogRGlzY292ZXJlZERldmljZVR5cGVbXSA9IFtdKSB7XHJcbiAgICB0aGlzLl9kZXZpY2VzQXJyYXkgPSBleGNlcHQ7XHJcbiAgICB0aGlzLnNjYW5uZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuaW5pdE9ic2VydmFibGVzKCk7XHJcbiAgfVxyXG5cclxuICBzdG9wU2NhbigpIHtcclxuICAgIGNvbnNvbGUubG9nKCdTdG9wIFNjYW5uaW5nIC4uLicpO1xyXG4gICAgICB0aGlzLnNjYW5uZXIuc3RvcCgpO1xyXG4gICAgfVxyXG5cclxuICBnZXRQcm90b2NvbChkZXZpY2U6IERpc2NvdmVyZWREZXZpY2VUeXBlIHwgc3RyaW5nLCBvcHRpb25zPzogQ29tUHJvdG9jb2xPcHRpb25zKTogQ29tUHJvdG9jb2wge1xyXG4gICAgY29uc3QgZGV2aWNlQWRkcmVzcyA9ICh0eXBlb2YgZGV2aWNlICE9PSAnc3RyaW5nJykgPyBkZXZpY2UuYWRkcmVzcyA6IGRldmljZTtcclxuICAgIHJldHVybiBuZXcgQkxFQ29tUHJvdG9jb2woZGV2aWNlQWRkcmVzcywgb3B0aW9ucyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==