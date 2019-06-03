import { Component, OnInit } from '@angular/core';
import { Predicate } from '../condition';

@Component({
  selector: 'app-date-predicate',
  templateUrl: './date-predicate.component.html',
  styleUrls: ['./date-predicate.component.css']
})
export class DatePredicateComponent  {
   predicate:Predicate;
}