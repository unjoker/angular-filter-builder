import {Predicate, ExpressionBuilder, FilteringField} from './condition';

export class PredicateAbstraction<T> implements Predicate{
   referenceValue:T;
   
  constructor(private operator:string, private evaluate:(value:T)=>boolean){}

  createExpression(field:FilteringField, expressionBuilder:ExpressionBuilder):void{ 
    expressionBuilder.Add(field, this.operator, this.referenceValue);      
  }

  isSatisfiedBy(value:T):boolean{
    return this.evaluate(value);
  }

  isValid():boolean{
    return this.referenceValue != undefined;
  }
} 


export class EqualsPredicate<T> extends PredicateAbstraction<T>{
   constructor(){
    super("==",(value)=>value == this.referenceValue);
  }
}

export class NotEqualsPredicate<T> extends PredicateAbstraction<T>{
   constructor(){
    super("!=",(value)=>value != this.referenceValue);
  }
}

export class GreaterThanPredicate<T> extends PredicateAbstraction<T>{

  constructor(){
    super(">",(value)=>value > this.referenceValue);
  }
}

export class GreaterOrEqualsThanPredicate<T> extends PredicateAbstraction<T>{

  constructor(){
    super(">=",(value)=>value >= this.referenceValue);
  }
}

export class LessThanPredicate<T> extends PredicateAbstraction<T>{
 
 constructor(){
   super("<",(value)=>value < this.referenceValue );
 }
}

export class LessOrEqualsThanPredicate<T> extends PredicateAbstraction<T>{
 
 constructor(){
   super("<=",(value)=>value <= this.referenceValue );
 }
}

export class ContainsPredicate extends PredicateAbstraction<string>{
  
  constructor(){
    super("contains", value => this.referenceValue.includes(value));
  }
}




