import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticModule } from './static/static.module';
import { DynamicModule } from './dynamic/dynamic.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StaticModule,
    DynamicModule
  ],
  exports:[
    StaticModule,
    DynamicModule
  ]
})
export class RoutesModule { }
