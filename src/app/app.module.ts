import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'

import { FilterModule } from '../filter/filter.module';

import { AppComponent } from './app.component';
import { FilterFieldsService } from './filter-fields.service';



@NgModule({
  imports:      [ BrowserModule, FormsModule, FilterModule, HttpModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [FilterFieldsService]
})
export class AppModule { }
