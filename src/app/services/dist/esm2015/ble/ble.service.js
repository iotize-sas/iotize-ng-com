import * as tslib_1 from "tslib";
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { BLEComProtocol, BLEScanner } from '@iotize/cordova-plugin-iotize-ble';
import { distinct } from "rxjs/operators";
import * as i0 from "@angular/core";
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
export { IoTizeBle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pb3RpemUtbmctY29tLyIsInNvdXJjZXMiOlsiYmxlL2JsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQTZDLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFHL0UsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQVcxQyxJQUFhLFNBQVM7QUFIdEI7O0dBRUc7QUFDSCxNQUFhLFNBQVM7SUFZcEI7UUFWUSxZQUFPLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUUzQixrQkFBYSxHQUE0QixFQUFFLENBQUM7UUFTbEQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFSRDs7T0FFRztJQUNILElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUtPLGVBQWU7UUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBeUIsRUFBRSxDQUFDLENBQUM7UUFDckUsTUFBTSxRQUFRLEdBQTBDO1lBQ3RELElBQUksRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDVixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzlDLENBQUM7U0FDRixDQUFBO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQzVDLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyx1QkFBdUI7U0FDbEQsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQ3hCLFFBQVEsQ0FBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FDMUIsQ0FBQztJQUNKLENBQUM7SUFFRCxjQUFjO1FBQ1osT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1lBQ25FLENBQUMsRUFDQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBRUgsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxZQUFZLENBQUMsU0FBaUMsRUFBRTtRQUM5QyxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUM1QixJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVILFdBQVcsQ0FBQyxNQUFxQyxFQUFFLE9BQTRCO1FBQzdFLE1BQU0sYUFBYSxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUM3RSxPQUFPLElBQUksY0FBYyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwRCxDQUFDO0NBQ0YsQ0FBQTs7QUE3RVksU0FBUztJQU5yQixVQUFVLENBQUM7UUFDVixVQUFVLEVBQUUsTUFBTTtLQUNuQixDQUFDO0lBQ0Y7O09BRUc7OztHQUNVLFNBQVMsQ0E2RXJCO1NBN0VZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIFBhcnRpYWxPYnNlcnZlciwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQkxFQ29tUHJvdG9jb2wsIEJMRVNjYW5uZXIgfSBmcm9tICdAaW90aXplL2NvcmRvdmEtcGx1Z2luLWlvdGl6ZS1ibGUnO1xyXG5pbXBvcnQgeyBDb21Qcm90b2NvbCwgQ29tUHJvdG9jb2xPcHRpb25zIH0gZnJvbSAnQGlvdGl6ZS9kZXZpY2UtY2xpZW50LmpzL3Byb3RvY29sL2FwaSc7XHJcbmltcG9ydCB7IElvVGl6ZUNvbVNlcnZpY2UsIERpc2NvdmVyZWREZXZpY2VUeXBlIH0gZnJvbSBcIi4uL2NvbS1zZXJ2aWNlLWludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBkaXN0aW5jdCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xyXG5cclxuZGVjbGFyZSB2YXIgaW90aXplQkxFOiBhbnk7XHJcblxyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG4vKipcclxuICogVGhpcyBjbGFzcyBnaXZlcyBhY2Nlc3MgdG8gdGhlIElvVGl6ZSBCTEUgY29yZG92YSBwbHVnaW4gd2l0aGluIGFuIGluamVjdGFibGUgYW5ndWxhciBzZXJ2aWNlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSW9UaXplQmxlIGltcGxlbWVudHMgSW9UaXplQ29tU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgc2Nhbm5lciA9IG5ldyBCTEVTY2FubmVyKCk7XHJcbiAgcHJpdmF0ZSBkZXZpY2VzQXJyYXkkOiBCZWhhdmlvclN1YmplY3Q8RGlzY292ZXJlZERldmljZVR5cGVbXT47XHJcbiAgcHJpdmF0ZSBfZGV2aWNlc0FycmF5IDogRGlzY292ZXJlZERldmljZVR5cGVbXSA9IFtdO1xyXG4gIHByaXZhdGUgc2Nhbm5lclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIC8qKlxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBCTEUgc2Nhbm5lciBzdGF0dXNcclxuICAgKi9cclxuICBnZXQgaXNTY2FubmluZygpIHtcclxuICAgIHJldHVybiB0aGlzLnNjYW5uZXIuaXNTY2FubmluZztcclxuICB9XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmluaXRPYnNlcnZhYmxlcygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0T2JzZXJ2YWJsZXMoKSB7XHJcbiAgICB0aGlzLmRldmljZXNBcnJheSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERpc2NvdmVyZWREZXZpY2VUeXBlW10+KFtdKTtcclxuICAgIGNvbnN0IG9ic2VydmVyOiBQYXJ0aWFsT2JzZXJ2ZXI8RGlzY292ZXJlZERldmljZVR5cGU+ID0ge1xyXG4gICAgICBuZXh0OiB2YWwgPT4ge1xyXG4gICAgICAgIHRoaXMuX2RldmljZXNBcnJheS5wdXNoKHZhbCk7XHJcbiAgICAgICAgdGhpcy5kZXZpY2VzQXJyYXkkLm5leHQodGhpcy5fZGV2aWNlc0FycmF5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zY2FubmVyU3Vic2NyaXB0aW9uID0gdGhpcy5kZXZpY2VzKCkucGlwZShcclxuICAgICAgZGlzdGluY3QoIF8gPT4gXy5hZGRyZXNzKSAvLyBmaWx0ZXJpbmcgYnkgYWRkcmVzc1xyXG4gICAgKS5zdWJzY3JpYmUob2JzZXJ2ZXIpXHJcbiAgfVxyXG5cclxuICBzdGFydFNjYW4oKTogT2JzZXJ2YWJsZTxEaXNjb3ZlcmVkRGV2aWNlVHlwZT4ge1xyXG4gICAgdGhpcy5zY2FubmVyLnN0YXJ0KHt9KTtcclxuICAgIHJldHVybiB0aGlzLmRldmljZXMoKS5waXBlKFxyXG4gICAgICBkaXN0aW5jdCggXyA9PiBfLmFkZHJlc3MpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tBdmFpbGFibGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBpb3RpemVCTEUuY2hlY2tBdmFpbGFibGUoKHZhbCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHZhbCk7XHJcbiAgICAgICAgdmFsID8gcmVzb2x2ZSgpIDogcmVqZWN0KCdCbHVlVG9vdGggaXMgbm90IG9uIGFuZCByZWFkeSB0byB1c2UnKTtcclxuICAgICAgfSxcclxuICAgICAgICAoZXJyKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyBhbiBvYnNlcnZhYmxlIHRoYXQgdHJpZ2dlcnMgZWFjaCB0aW1lIGEgbmV3IHRhcCBpcyBkaXNjb3ZlcmVkXHJcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxEaXNjb3ZlcmVkRGV2aWNlVHlwZT59XHJcbiAgICovXHJcblxyXG4gIGRldmljZXMoKTogT2JzZXJ2YWJsZTxEaXNjb3ZlcmVkRGV2aWNlVHlwZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2Nhbm5lci5kZXZpY2VzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgZGV2aWNlc0FycmF5KCk6IE9ic2VydmFibGU8RGlzY292ZXJlZERldmljZVR5cGVbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZGV2aWNlc0FycmF5JC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIGNsZWFyRGV2aWNlcyhleGNlcHQ6IERpc2NvdmVyZWREZXZpY2VUeXBlW10gPSBbXSkge1xyXG4gICAgdGhpcy5fZGV2aWNlc0FycmF5ID0gZXhjZXB0O1xyXG4gICAgdGhpcy5zY2FubmVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLmluaXRPYnNlcnZhYmxlcygpO1xyXG4gIH1cclxuXHJcbiAgc3RvcFNjYW4oKSB7XHJcbiAgICBjb25zb2xlLmxvZygnU3RvcCBTY2FubmluZyAuLi4nKTtcclxuICAgICAgdGhpcy5zY2FubmVyLnN0b3AoKTtcclxuICAgIH1cclxuXHJcbiAgZ2V0UHJvdG9jb2woZGV2aWNlOiBEaXNjb3ZlcmVkRGV2aWNlVHlwZSB8IHN0cmluZywgb3B0aW9ucz86IENvbVByb3RvY29sT3B0aW9ucyk6IENvbVByb3RvY29sIHtcclxuICAgIGNvbnN0IGRldmljZUFkZHJlc3MgPSAodHlwZW9mIGRldmljZSAhPT0gJ3N0cmluZycpID8gZGV2aWNlLmFkZHJlc3MgOiBkZXZpY2U7XHJcbiAgICByZXR1cm4gbmV3IEJMRUNvbVByb3RvY29sKGRldmljZUFkZHJlc3MsIG9wdGlvbnMpO1xyXG4gIH1cclxufVxyXG4iXX0=