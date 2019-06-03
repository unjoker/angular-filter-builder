import { Component, OnInit, Input,Output, ViewChild,EventEmitter } from "@angular/core";

import { GroupCondition, ExpressionBuilder, FilteringField } from "./condition";

@Component({
  selector: "mc-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"]
})
export class FilterComponent {
  @Input() fields:FilteringField[];

  root:GroupCondition = new GroupCondition();

  buildExpression(expressionBuilder:ExpressionBuilder):void {
    this.root.createExpression(expressionBuilder);
  }

  clear():void {
    this.root.clear();
  }
}