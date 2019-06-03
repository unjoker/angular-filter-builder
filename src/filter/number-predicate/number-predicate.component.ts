import { Component, OnInit } from '@angular/core';
import { Predicate } from '../condition';

@Component({
  selector: 'app-number-predicate',
  templateUrl: './number-predicate.component.html',
  styleUrls: ['./number-predicate.component.css']
})
export class NumberPredicateComponent implements OnInit {
  predicate:Predicate;
  constructor() { }

  ngOnInit() {
  }

}