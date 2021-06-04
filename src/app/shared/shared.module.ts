import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectedMaterialModule } from './styles/selected-material/selected-material.module';
import { ThemeChooserComponent } from './components/theme-chooser/theme-chooser.component';



@NgModule({
  declarations: [FooterComponent, ToolbarComponent, ThemeChooserComponent],
  imports: [
    CommonModule,
    SelectedMaterialModule,
    BrowserAnimationsModule
  ],
  exports:[
    ToolbarComponent,
    FooterComponent,
    SelectedMaterialModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule>{
    return {
      ngModule: SharedModule,
      providers:[
        ToolbarComponent, 
        FooterComponent,
        SelectedMaterialModule,
        BrowserAnimationsModule
      ]
    }
  }
 }
