import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterComponent } from './filter.component';
import { SingleConditionComponent } from './single-condition/single-condition.component';
import { GroupConditionComponent } from './group-condition/group-condition.component';
import { PredicatesService } from './predicates.service';

import { DatePredicateComponent } from './date-predicate/date-predicate.component';
import { NumberPredicateComponent } from './number-predicate/number-predicate.component';
import { StringPredicateComponent } from './string-predicate/string-predicate.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FilterComponent, SingleConditionComponent, GroupConditionComponent,  DatePredicateComponent, NumberPredicateComponent, StringPredicateComponent],
  exports: [FilterComponent],
  entryComponents:[DatePredicateComponent, NumberPredicateComponent,StringPredicateComponent],
  providers: [PredicatesService]
})
export class FilterModule { }