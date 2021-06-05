import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }];


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule.forRoot()
  ]
})
export class StaticModule { }
