import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IoTizeBle } from './ble/ble.service';
import { IoTizeTap } from './tap/tap.service';
import { IoTizeNfc } from './nfc/nfc.service';
import { NFC } from '@ionic-native/nfc/ngx';

@NgModule({
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
export class IotizeNgComModule { }
