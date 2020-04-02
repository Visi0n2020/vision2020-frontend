import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisionRoutingModule } from './vision-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    VisionRoutingModule
  ]
})
export class VisionModule { }
