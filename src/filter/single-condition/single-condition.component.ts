import { Component, OnInit, ComponentFactoryResolver, Injector,ComponentRef, Input, ViewContainerRef, ViewChild, AfterViewInit,EventEmitter, Output } from '@angular/core';

import { SingleCondition, Predicate, FilteringField } from '../condition';

import {PredicatesService} from '../predicates.service';

@Component({
  selector: 'app-single-condition',
  templateUrl: './single-condition.component.html',
  styleUrls: ['./single-condition.component.css'],
  providers:[PredicatesService]
})
export class SingleConditionComponent implements OnInit {
  predicates:{};    
  selectedPredicate:ComponentRef<any>;
  selectedField:FilteringField;
  
  @Input()fields:FilteringField[];
  @Input() condition:SingleCondition;
  @Input() removable = true;
  @Input() removeFunction: Function;

  @ViewChild('predicateContainer',{read:ViewContainerRef}) predicateView;

  constructor(private predicatesServices:PredicatesService){
    
  }

  ngOnInit(){    
    this.onFieldSelected(0);
  } 

 onFieldSelected(index:number){  
   this.selectedField = this.fields[index];   
   this.predicates = this.predicatesServices.getPredicatesForDataType(this.selectedField);  
   this.activatePredicate(this.getPredicatesNames()[0]);

   this.condition.field= this.selectedField;  
 }

 activatePredicate(predicate){
     this.selectedPredicate = this.predicates[predicate];
     this.predicateView.detach();
     this.predicateView.insert(this.selectedPredicate.hostView);
      this.condition.predicate = this.selectedPredicate.instance.predicate;
  }

  getPredicatesNames():string[]{
    return Object.keys(this.predicates);
  }
  
  remove(){
    this.removeFunction();
  }
}