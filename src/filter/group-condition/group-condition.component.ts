import { Component, Input } from "@angular/core";
import { GroupCondition, SingleCondition, FilteringField, LogicalOperator } from "../condition";


@Component({
  selector: "app-group-condition",
  templateUrl: "./group-condition.component.html",
  styleUrls: ["./group-condition.component.css"]
})
export class GroupConditionComponent {
  @Input() fields: FilteringField;
  @Input() conditions: GroupCondition;
  @Input() removable = true;
  @Input() removeFunction: Function;
  
  addSingleCondition():void {
    this.conditions.add(new SingleCondition());
  }

  addGroup():void {
    this.conditions.add(new GroupCondition());
  }

  createRemover(condition:SingleCondition):Function {
    return ()=> this.conditions.remove(condition);
  }

  remove(){
    this.removeFunction();
  }

  onOperatorChanged(operator:string){
    this.conditions.evaluationType = operator == "AND" ? 
      LogicalOperator.AND : LogicalOperator.OR;
  }
}