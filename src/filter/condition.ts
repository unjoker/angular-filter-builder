  export class FilteringField
  {
    constructor(public name:string, public displayName:string, private type:string){}

    public formatValue(value: any): string {
      switch(this.type){      
        case "date":
          return `${value.getFullYear()}-${this.formatNumber(value.getMonth())}-${this.formatNumber(value.getDay())}`;

        case "string":
          return `'${value}'`;

        case "number":
          return  `${this.formatNumber(value)}`;

        default:
          return value.ToString();  
      }   
    }

    private formatNumber(value:number):string{
      let numberPrefix = value < 10 ? '0' : ''; 
      return numberPrefix + value; 
    }

    public isDate(): Boolean {
      return this.type == "date";
    }

    public isNumeric(): Boolean {
      return this.type == "number";
    }

    public isString(): Boolean{
      return this.type == "string";
    }   
    
    public static CreateNumeric(name:string, displayName:string):FilteringField{
      return new FilteringField(name, displayName, "number");
    }

    public static CreateString(name:string, displayName:string):FilteringField{
      return new FilteringField(name, displayName, "string");
    }

    public static CreateDate(name:string,displayName:string):FilteringField{
      return new FilteringField(name, displayName, "date");
    }
  }

  export interface Condition {
    createExpression(expressionBuilder:ExpressionBuilder):void;
    isSatisfiedBy(candidate:any):boolean;
    isValid():boolean;
  }

  export class SingleCondition implements Condition {
    predicate:Predicate;
    field:FilteringField;

    createExpression(expressionBuilder:ExpressionBuilder) {
      this.predicate.createExpression(this.field, expressionBuilder);
    }

    isSatisfiedBy(candidate:any):boolean {
      let value:any = candidate[this.field.name];
      return value? this.predicate.isSatisfiedBy(value) : false;
    }

    isValid():boolean{
       return this.predicate.isValid(); 
    }
  }

  export class GroupCondition implements Condition, Iterable<Condition> {
    [Symbol.iterator](): IterableIterator<Condition> {
      return this.conditions[Symbol.iterator]();
    } 

    private conditions:Condition[] = [];

    evaluationType:LogicalOperator = LogicalOperator.AND;

    createExpression(expressionBuilder: ExpressionBuilder):void {
      expressionBuilder.CreateGroup(this.evaluationType.name);

      for(let condition of this.conditions)
      condition.createExpression(expressionBuilder);

      expressionBuilder.CloseGroup();
    }

    isSatisfiedBy(candidate:any):boolean {
      return this.evaluationType.isSatisfiedBy(this.conditions,candidate);
    }

    add(condition:Condition):void {
      this.conditions.push(condition);
    }

    remove(condition:Condition):void {
      let index:number = this.conditions.indexOf(condition);
      this.conditions.splice(index,1);
    }

    clear():void {
      console.log("clear!");
      this.conditions = [];
    }

    isValid():boolean{
      return this.conditions.every(condition=> condition.isValid());      
    }
    
  }

  export class LogicalOperator{    
    private constructor(
      private _name:string,
      private _evalFunction:(conditions:Condition[], candidate:any)=>boolean
      ){}      
    
    public get name(){return this._name}

    public isSatisfiedBy(conditions:Condition[], candidate):boolean{
       return this._evalFunction(conditions,candidate);
    }

    public static AND = new LogicalOperator(
      "AND", 
      (conditions, candidate)=>       
         conditions.every(condition=>condition.isSatisfiedBy(candidate))
      );
    
    public static OR = new LogicalOperator(
      "OR", 
      (conditions, candidate)=>       
        conditions.some(condition=>condition.isSatisfiedBy(candidate))
      );
  }
 
  export interface Predicate {
    createExpression(field:FilteringField, expressionBuilder: ExpressionBuilder):void;
    isSatisfiedBy(value:any):boolean;
    isValid():boolean;
  }

  export interface ExpressionBuilder{     
     CreateGroup(groupName:string);
     CloseGroup();
     Add(field:FilteringField, operator:string, referenceValue:any);
     BuildExpression():string;
  }
    
 
