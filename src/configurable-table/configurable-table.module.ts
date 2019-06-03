import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurableTableComponent } from './configurable-table/configurable-table.component';
import { ColumnSelectorComponent } from './column-selector/column-selector.component';
import { ModalComponent } from './_directives';
import { ModalService } from './_services';

@NgModule({
  declarations: [ConfigurableTableComponent, ColumnSelectorComponent, ModalComponent],
  imports: [
    CommonModule
  ],
  providers:[ModalService],
  exports:[ConfigurableTableComponent]
})
export class ConfigurableTableModule { }
