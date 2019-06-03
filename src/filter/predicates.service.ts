import { Injectable, ComponentRef,ComponentFactoryResolver,Injector, Type } from "@angular/core";

import { Predicate, FilteringField } from "./condition";
import { EqualsPredicate,NotEqualsPredicate, GreaterOrEqualsThanPredicate, GreaterThanPredicate, LessOrEqualsThanPredicate,LessThanPredicate,ContainsPredicate} from "./predicates";

import { DatePredicateComponent } from "./date-predicate/date-predicate.component";
import { NumberPredicateComponent } from "./number-predicate/number-predicate.component";
import { StringPredicateComponent } from "./string-predicate/string-predicate.component";

@Injectable()
export class PredicatesService {
  private predicates:{[dataType:string]: {}} = {};

  constructor(private resolver:ComponentFactoryResolver, private injector:Injector) {
    this.createDatePredicates();
    this.createNumberPredicates();
    this.createStringPredicates();
   }

   private createComponent<T extends {predicate:Predicate}>(componentClass:Type<T>, predicate:Predicate):ComponentRef<T> {
     let factory = this.resolver.resolveComponentFactory(componentClass);
     let component = factory.create(this.injector);
     component.instance.predicate = predicate;
     return component;
  }

   private createDatePredicates() {
     this.predicates.date = {
        "on":this.createDatePredicateComponent(new EqualsPredicate<Date>()),
        "not":this.createDatePredicateComponent(new NotEqualsPredicate<Date>()),
        "before":this.createDatePredicateComponent(new LessThanPredicate<Date>()),
        "after":this.createDatePredicateComponent(new GreaterThanPredicate<Date>()),
        "al least from":this.createDatePredicateComponent(new GreaterOrEqualsThanPredicate<Date>()),
        "at most to":this.createDatePredicateComponent(new LessOrEqualsThanPredicate<Date>()),
     };
   }

   private createNumberPredicates() {
     this.predicates.number= {
       "equals":this.createNumberPredicateComponent(new EqualsPredicate<number>() ),
       "not equals":this.createNumberPredicateComponent(new NotEqualsPredicate<number>()),
       "greater than":this.createNumberPredicateComponent(new GreaterThanPredicate<number>()),
       "less than":this.createNumberPredicateComponent(new LessThanPredicate<number>()),
       "greater or equals to":this.createNumberPredicateComponent(new GreaterOrEqualsThanPredicate<number>()),
       "less or equals to":this.createNumberPredicateComponent(new LessOrEqualsThanPredicate<number>()),
     };
   }

   private createStringPredicates() {
     this.predicates.string = {
       "equals":this.createStringPredicateComponent(new EqualsPredicate<string>()),
       "not equals":this.createStringPredicateComponent(new NotEqualsPredicate<string>()),
       "contains":this.createStringPredicateComponent(new ContainsPredicate())
     };
   }

   private createDatePredicateComponent(predicate:Predicate):ComponentRef<DatePredicateComponent> {
      return this.createComponent(DatePredicateComponent,predicate);
   }

   private createNumberPredicateComponent(predicate:Predicate):ComponentRef<NumberPredicateComponent> {
      return this.createComponent(NumberPredicateComponent,predicate);
   }

   private createStringPredicateComponent(predicate:Predicate):ComponentRef<StringPredicateComponent> {
      return this.createComponent(StringPredicateComponent,predicate);
   }

   public getPredicatesForDataType(dataType:FilteringField) {
      if(dataType.isDate())
        return this.predicates.date;

      else if(dataType.isNumeric())
        return this.predicates.number;
        
      else if(dataType.isString())
        return this.predicates.string;
   }
}