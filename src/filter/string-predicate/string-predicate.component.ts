import { Component, OnInit } from '@angular/core';
import { Predicate } from '../condition';

@Component({
  selector: 'app-string-predicate',
  templateUrl: './string-predicate.component.html',
  styleUrls: ['./string-predicate.component.css']
})
export class StringPredicateComponent implements OnInit {
  predicate:Predicate;
  constructor() { }

  ngOnInit() {
  }

}