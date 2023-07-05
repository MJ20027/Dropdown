import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownsComponent } from './MyComponents/dropdowns/dropdowns.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { FormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    DropdownsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
