import { ExpressionBuilder ,FilteringField} from "./condition";

export class DefaultExpressionBuilder implements ExpressionBuilder {
  groups = new Array<ExpressionGroup>();
  currentGroup = new ExpressionGroup("");

  public CreateGroup(operator: string): void {
    this.groups.push(this.currentGroup);
    this.currentGroup = new ExpressionGroup(operator);
  }

  public CloseGroup() {    
    let groupExpression = this.currentGroup.GetExpression().trim();
    this.currentGroup = this.groups.pop();
    
    if(groupExpression != "")
      this.currentGroup.Add(`(${groupExpression})`);
  }

  public Add(field: FilteringField, operator: string, referenceValue: any) {
    this.currentGroup.Add(this.buildExpression(field,operator,referenceValue));
  }

  public BuildExpression(): string {
    while(this.groups.length >0) 
      this.CloseGroup();

    let expression = this.currentGroup.GetExpression().trim();

    return this.formatExpression(expression)
      
  }

  protected formatExpression(expression: string): string {
    return expression
      .substring(1, expression.length - 1)
  }

  protected buildExpression(field: FilteringField, operator: string, referenceValue: any): string {
    return `${field.name} ${operator} ${field.formatValue(referenceValue)}`;
  }


}



export class ODataExpressionBuilder extends DefaultExpressionBuilder { 

  buildExpression(field: FilteringField, operator: string, referenceValue: any): string {
    return operator == "contains"? 
      `substringof('${referenceValue}', ${field.name})`:
      `${field.name} ${this.formatOperator(operator)} ${this.formatValue(field,referenceValue)}`;
  }

  formatExpression(expression:string):string{
    return expression
      .substring(1, expression.length-1)
      .replace(/'/g,"%27")
      .replace(new RegExp(" ", 'g'),'%20')
  }

  formatValue(field:FilteringField, referenceValue: any){     
       return field.isDate()?
        `datetime'${field.formatValue(referenceValue)}'`:
         field.formatValue(referenceValue);   
  }

  private formatOperator(operator: string) {
    switch (operator) {
      case "==":
        return "eq";
      case ">":
        return "gt";
      case ">=":
        return "ge";
      case "<":
        return "lt";
      case "<=":
        return "le";
      case "!=":
        return "ne";      
    }
  }


}


class ExpressionGroup{
  
  private expression = "";

  constructor(private concatenator:string){ }

  Add(expression:string):void{
    this.expression += `${expression} ${this.concatenator} `;
  }

  GetExpression(){
    return this.expressionWithoutTrailingConcatenator();
  }

  private expressionWithoutTrailingConcatenator() {
    return this.expression.substring(0, this.expression.lastIndexOf(this.concatenator));
  }
}

