import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionCallComponent } from './routes/dynamic/session-call/session-call.component';
import { HomeComponent } from './routes/static/home/home.component';

const routes: Routes = [
  {path:'', 
  component: HomeComponent},
  {path:'call', 
  component: SessionCallComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
