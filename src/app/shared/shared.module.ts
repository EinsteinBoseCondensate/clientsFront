import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectedMaterialModule } from './styles/selected-material/selected-material.module';
import { ThemeChooserComponent } from './components/theme-chooser/theme-chooser.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { ClientService } from './services/clients.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CustomDataTableComponent } from './components/custom-data-table/custom-data-table.component';


@NgModule({
  declarations: [FooterComponent, ToolbarComponent, ThemeChooserComponent, SpinnerComponent, CustomDataTableComponent],
  imports: [
    CommonModule,
    SelectedMaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,    
    FontAwesomeModule  
  ],
  providers:[
    ApiService,
    ClientService
  ],
  exports:[
    ToolbarComponent,
    FooterComponent,
    SpinnerComponent,
    ThemeChooserComponent,
    SelectedMaterialModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    CustomDataTableComponent
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
        FontAwesomeModule,
        BrowserAnimationsModule,
        ApiService,
        ClientService
      ]
    }
  }
 }
