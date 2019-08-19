import { Component,ViewChild, AfterContentChecked } from '@angular/core';
import {FilterComponent } from '../filter/filter.component';
import { FilteringField } from '../filter/condition';
import { FilterFieldsService } from './filter-fields.service';
import { ODataExpressionBuilder, DefaultExpressionBuilder } from '../filter/expressionBuilders';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  @ViewChild("filter") filter:FilterComponent;
  
  fieldsMetadata:FilteringField[];
  odataQuery:string;
  normalQuery:string;

  constructor(filterService:FilterFieldsService){
     filterService.getFields().subscribe(result=>this.fieldsMetadata =result);
  }

  search():void {
    let odataExpressionBuilder = new ODataExpressionBuilder();
    this.filter.buildExpression(odataExpressionBuilder);
    this.odataQuery = odataExpressionBuilder.BuildExpression();

    let normalExpressionBuilder = new DefaultExpressionBuilder();
    this.filter.buildExpression(normalExpressionBuilder);
    this.normalQuery = normalExpressionBuilder.BuildExpression(); 
  }

  clearFilters():void {
    this.filter.clear();
  }

}
