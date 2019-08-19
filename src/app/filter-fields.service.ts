import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { FilteringField } from '../filter/condition';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterFieldsService {

  constructor(private http:Http) { }

  getFields():Observable<FilteringField[]>{
    
    return new Observable(observer=>{
      this.http.get('assets/filterFields.json')
        .subscribe(response=>{
          let metadata=response.json();
          let fields = new Array<FilteringField>();

          metadata.forEach(field => {
            fields.push(new FilteringField(field.name, field.displayName, field.type));
          });

          observer.next(fields);
          observer.complete();
        });
      });           
          
              
  }
}
