import { Component, OnInit, Input } from '@angular/core';
import { TableColumn } from '../tableColumn';
import { ModalService } from '../_services';

@Component({
  selector: 'mc-configurable-table',
  templateUrl: './configurable-table.component.html',
  styleUrls: ['./configurable-table.component.css']
})
export class ConfigurableTableComponent implements OnInit {
  @Input() columns = new Array<TableColumn>();
  @Input() data=[];
  
  visibleColumns(){
    return this.columns.filter(column=>column.isVisible);
  }

  constructor( private modalService:ModalService) { }

  ngOnInit() {
  }

  closeColumnSelection(){
    this.modalService.close("columnSelector");
  }

  openColumnSelection(){
    this.modalService.open("columnSelector");
  }
}
