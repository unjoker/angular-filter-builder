import { Component, OnInit } from '@angular/core';
import { Predicate } from '../condition';

@Component({
  selector: 'app-date-between-predicate',
  template: '<input type="date" class="form-control" (change)="predicate.inferiorLimit=$event.target.valueAsDate"/> and <input type="date" class="form-control" (change)="predicate.superiorLimit=$event.target.valueAsDate"/>',
  styles: []
})
export class DateBetweenPredicateComponent implements OnInit {
  predicate:Predicate;

  constructor() { }
  
  ngOnInit() {
  }
}

