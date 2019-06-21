import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { NFC } from "@ionic-native/nfc/ngx";
import { map } from "rxjs/operators";
import { NFCComProtocol } from '@iotize/device-com-nfc.cordova';
import { Platform } from '@ionic/angular';
import * as i0 from "@angular/core";
import * as i1 from "@ionic-native/nfc/ngx/index";
import * as i2 from "@ionic/angular";
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
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
IoTizeNfc.ngInjectableDef = i0.defineInjectable({ factory: function IoTizeNfc_Factory() { return new IoTizeNfc(i0.inject(i1.NFC), i0.inject(i2.Platform)); }, token: IoTizeNfc, providedIn: "root" });
IoTizeNfc = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [NFC,
        Platform])
], IoTizeNfc);
export { IoTizeNfc };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmZjLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pb3RpemUtbmctY29tLyIsInNvdXJjZXMiOlsibmZjL25mYy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxHQUFHLEVBQWEsTUFBTSx1QkFBdUIsQ0FBQztBQUd2RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFFcEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFBO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUsxQyxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFTO0lBRXBCLFlBQW1CLEdBQVEsRUFDakIsUUFBa0I7UUFEVCxRQUFHLEdBQUgsR0FBRyxDQUFLO1FBQ2pCLGFBQVEsR0FBUixRQUFRLENBQVU7SUFBSSxDQUFDO0lBRWpDLFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRTtZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUE7WUFDOUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN6QjtRQUNILENBQUMsRUFDQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUN0RCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ0wsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQy9DLENBQUM7SUFDTixDQUFDO0lBRUQsY0FBYztRQUNaLE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDakQsSUFBSTtnQkFDRixNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3pCLE9BQU8sRUFBRSxDQUFDO2FBQ1g7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDZjtRQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsUUFBUTtRQUNOLE9BQU8sQ0FBQywrQkFBK0I7SUFDekMsQ0FBQztJQUNELFdBQVc7UUFDVCxPQUFPLElBQUksY0FBYyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFLO1FBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQsWUFBWTtRQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0QsWUFBWTtRQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU8sc0JBQXNCLENBQUMsSUFBZTtRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO1FBQ25DLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRSxNQUFNLE1BQU0sR0FBeUI7WUFDbkMsSUFBSSxFQUFFLE9BQU87WUFDYixPQUFPLEVBQUUsVUFBVTtTQUNwQixDQUFDO1FBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRU8sd0JBQXdCLENBQUMsS0FBZTtRQUM5QyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ2xCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNWLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRTtnQkFDWixJQUFJLElBQUksR0FBRyxDQUFDO2FBQ2I7WUFDRCxJQUFJLFVBQVUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2RCxVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sVUFBVSxDQUFDO1FBQ3BCLENBQUMsQ0FBQzthQUNELE9BQU8sRUFBRTthQUNULElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNkLENBQUM7Q0FDRixDQUFBOztBQTFFWSxTQUFTO0lBSHJCLFVBQVUsQ0FBQztRQUNWLFVBQVUsRUFBRSxNQUFNO0tBQ25CLENBQUM7NkNBR3dCLEdBQUc7UUFDUCxRQUFRO0dBSGpCLFNBQVMsQ0EwRXJCO1NBMUVZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5GQywgTmRlZkV2ZW50IH0gZnJvbSBcIkBpb25pYy1uYXRpdmUvbmZjL25neFwiO1xyXG5pbXBvcnQgeyBJb1RpemVDb21TZXJ2aWNlLCBEaXNjb3ZlcmVkRGV2aWNlVHlwZSB9IGZyb20gXCIuLi9jb20tc2VydmljZS1pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiXHJcbmltcG9ydCB7IENvbVByb3RvY29sIH0gZnJvbSAnQGlvdGl6ZS9kZXZpY2UtY2xpZW50LmpzL3Byb3RvY29sL2FwaSc7XHJcbmltcG9ydCB7IE5GQ0NvbVByb3RvY29sIH0gZnJvbSAnQGlvdGl6ZS9kZXZpY2UtY29tLW5mYy5jb3Jkb3ZhJ1xyXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIElvVGl6ZU5mYyBpbXBsZW1lbnRzIElvVGl6ZUNvbVNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmZjOiBORkMsXHJcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSkgeyB9XHJcblxyXG4gIHN0YXJ0U2NhbigpOiBPYnNlcnZhYmxlPERpc2NvdmVyZWREZXZpY2VUeXBlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5uZmMuYWRkTmRlZkxpc3RlbmVyKCgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ05GQyBsaXN0ZW5lciBPTicpXHJcbiAgICAgIGlmICh0aGlzLnBsYXRmb3JtLmlzKCdpb3MnKSkge1xyXG4gICAgICAgIHRoaXMubmZjLmJlZ2luU2Vzc2lvbigpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdORkMgbGlzdGVuZXIgZGlkblxcJ3Qgc3RhcnQ6ICcsIGVycm9yKVxyXG4gICAgICB9KS5waXBlKFxyXG4gICAgICAgIG1hcChuZGVmID0+IHRoaXMubmRlZlRvRGlzY292ZXJlZERldmljZShuZGVmKSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIGNoZWNrQXZhaWxhYmxlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCB0aGlzLm5mYy5lbmFibGVkKCk7XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHRoaXMubG9nRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICBzdG9wU2NhbigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybjsgLy8gbm8gc3BlY2lmaWMgd2F5IHRvIHN0b3Agc2NhblxyXG4gIH1cclxuICBnZXRQcm90b2NvbCgpOiBDb21Qcm90b2NvbCB7XHJcbiAgICByZXR1cm4gbmV3IE5GQ0NvbVByb3RvY29sKCk7XHJcbiAgfVxyXG5cclxuICBsb2dFcnJvcihlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignW0lvVGl6ZU5GQ10gRVJST1I6ICcgKyBlcnJvci5tZXNzYWdlID8gZXJyb3IubWVzc2FnZSA6IGVycm9yKTtcclxuICB9XHJcblxyXG4gIGRldmljZXNBcnJheSgpOiBPYnNlcnZhYmxlPERpc2NvdmVyZWREZXZpY2VUeXBlW10+IHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCBub3QgaW1wbGVtZW50ZWQuXCIpO1xyXG4gIH1cclxuICBjbGVhckRldmljZXMoKTogdm9pZCB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbmRlZlRvRGlzY292ZXJlZERldmljZShuZGVmOiBOZGVmRXZlbnQpOiBEaXNjb3ZlcmVkRGV2aWNlVHlwZSB7XHJcbiAgICBjb25zb2xlLmxvZyhuZGVmKTtcclxuICAgIGxldCBtZXNzYWdlID0gbmRlZi50YWcubmRlZk1lc3NhZ2U7XHJcbiAgICBjb25zdCBhcHBOYW1lID0gU3RyaW5nLmZyb21DaGFyQ29kZSguLi5tZXNzYWdlWzNdLnBheWxvYWQpO1xyXG4gICAgY29uc3QgbWFjQWRkcmVzcyA9IHRoaXMuY29udmVydEJ5dGVzVG9CTEVBZGRyZXNzKG1lc3NhZ2VbMl0ucGF5bG9hZCk7XHJcbiAgICBjb25zdCBkZXZpY2U6IERpc2NvdmVyZWREZXZpY2VUeXBlID0ge1xyXG4gICAgICBuYW1lOiBhcHBOYW1lLFxyXG4gICAgICBhZGRyZXNzOiBtYWNBZGRyZXNzXHJcbiAgICB9O1xyXG4gICAgY29uc29sZS5sb2coZGV2aWNlKTtcclxuICAgIHJldHVybiBkZXZpY2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbnZlcnRCeXRlc1RvQkxFQWRkcmVzcyhieXRlczogbnVtYmVyW10pOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGJ5dGVzLnNsaWNlKDEpXHJcbiAgICAgIC5tYXAoYnl0ZSA9PiB7XHJcbiAgICAgICAgaWYgKGJ5dGUgPCAwKSB7XHJcbiAgICAgICAgICBieXRlICs9IDI1NjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGJ5dGVTdHJpbmcgPSAnMCcgKyBieXRlLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGJ5dGVTdHJpbmcgPSBieXRlU3RyaW5nLnNsaWNlKC0yKTtcclxuICAgICAgICByZXR1cm4gYnl0ZVN0cmluZztcclxuICAgICAgfSlcclxuICAgICAgLnJldmVyc2UoKVxyXG4gICAgICAuam9pbignOicpXHJcbiAgfVxyXG59XHJcbiJdfQ==