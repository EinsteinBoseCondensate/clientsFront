import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticModule } from './static/static.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StaticModule
  ],
  exports:[
    StaticModule
  ]
})
export class RoutesModule { }
