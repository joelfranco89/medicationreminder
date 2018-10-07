import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReminderFormComponent } from './reminder-form/reminder-form.component';

import { FormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    ReminderFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
