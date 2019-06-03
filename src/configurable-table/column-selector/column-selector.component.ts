import { Component, OnInit, Input } from '@angular/core';
import { TableColumn } from '../tableColumn';

@Component({
  selector: 'mc-column-selector',
  templateUrl: './column-selector.component.html',
  styleUrls: ['./column-selector.component.css']
})
export class ColumnSelectorComponent implements OnInit {
  @Input() columns = new Array<TableColumn>();

  constructor() { }

  ngOnInit() {
  }

  columnGroups():TableColumn[][]{
     let result = [];
     let group =[];
     for (let i = 0; i < this.columns.length; i++) {
       const column = this.columns[i];       
       group.push(column);

       if(i > 0 && i % 3 == 0){
         result.push(group);
         group=[];
       }
     }       
     return result;
  }

  onChange(column:TableColumn,checked:boolean){
    column.isVisible = checked;
  }
}
