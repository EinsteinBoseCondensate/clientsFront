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
import { CustomDataTableServerPagedComponent } from './components/custom-data-table-server-paged/custom-data-table-server-paged.component';
import { UserIconButtonComponent } from './components/buttons/user-icon-button/user-icon-button.component';


@NgModule({
  declarations: [FooterComponent, ToolbarComponent, ThemeChooserComponent, SpinnerComponent, CustomDataTableComponent, CustomDataTableServerPagedComponent, UserIconButtonComponent],
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
    CustomDataTableComponent,
    UserIconButtonComponent,
    CustomDataTableServerPagedComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule>{
    return {
      ngModule: SharedModule,
      providers:[



        
        ApiService,
        ClientService
      ]
    }
  }
 }
