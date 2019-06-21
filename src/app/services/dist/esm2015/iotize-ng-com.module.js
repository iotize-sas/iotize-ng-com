import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IoTizeBle } from './ble/ble.service';
import { IoTizeTap } from './tap/tap.service';
import { IoTizeNfc } from './nfc/nfc.service';
import { NFC } from '@ionic-native/nfc/ngx';
let IotizeNgComModule = class IotizeNgComModule {
};
IotizeNgComModule = tslib_1.__decorate([
    NgModule({
        declarations: [],
        imports: [
            CommonModule
        ],
        providers: [
            IoTizeBle,
            IoTizeNfc,
            IoTizeTap,
            NFC
        ]
    })
], IotizeNgComModule);
export { IotizeNgComModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW90aXplLW5nLWNvbS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pb3RpemUtbmctY29tLyIsInNvdXJjZXMiOlsiaW90aXplLW5nLWNvbS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQWM1QyxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtDQUFJLENBQUE7QUFBckIsaUJBQWlCO0lBWjdCLFFBQVEsQ0FBQztRQUNSLFlBQVksRUFBRSxFQUFFO1FBQ2hCLE9BQU8sRUFBRTtZQUNQLFlBQVk7U0FDYjtRQUNELFNBQVMsRUFBRTtZQUNULFNBQVM7WUFDVCxTQUFTO1lBQ1QsU0FBUztZQUNULEdBQUc7U0FDSjtLQUNGLENBQUM7R0FDVyxpQkFBaUIsQ0FBSTtTQUFyQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBJb1RpemVCbGUgfSBmcm9tICcuL2JsZS9ibGUuc2VydmljZSc7XHJcbmltcG9ydCB7IElvVGl6ZVRhcCB9IGZyb20gJy4vdGFwL3RhcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW9UaXplTmZjIH0gZnJvbSAnLi9uZmMvbmZjLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBORkMgfSBmcm9tICdAaW9uaWMtbmF0aXZlL25mYy9uZ3gnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBJb1RpemVCbGUsXHJcbiAgICBJb1RpemVOZmMsXHJcbiAgICBJb1RpemVUYXAsXHJcbiAgICBORkNcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJb3RpemVOZ0NvbU1vZHVsZSB7IH1cclxuIl19