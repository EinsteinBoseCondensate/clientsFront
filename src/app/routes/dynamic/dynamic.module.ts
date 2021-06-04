import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionCallComponent } from './session-call/session-call.component';
import { SignalrService } from '../../shared/services/signal-r.service';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SessionCallComponent
  ],
  imports: [
    CommonModule,
    SharedModule.forRoot()
  ],
  providers:[
    SignalrService
  ],
  exports:[
    SessionCallComponent
  ]
})
export class DynamicModule { }
