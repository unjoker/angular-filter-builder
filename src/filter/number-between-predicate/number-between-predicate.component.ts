import { Component, OnInit } from '@angular/core';
import { Predicate } from '../condition';

@Component({
  selector: 'app-number-between-predicate',
  template: '<input type="number" class="form-control" (change)="predicate.inferiorLimit=$event.target.value"/> and <input type="number" class="form-control" (change)="predicate.superiorLimit=$event.target.value"/>',
  styles: []
})
export class NumberBetweenPredicateComponent implements OnInit {
  predicate:Predicate;
  constructor() { }

  ngOnInit() {
  }

}