# Filter Builder for Angular

Filter Builder is an angular module that allows the creation of filter expressions that can be target to different data providers like OData.

## Installation

Copy into your project

## Usage

```typescript
import  {  Component,ViewChild,  AfterContentChecked  }  from  '@angular/core';
import  {  FilterComponent  }  from  '../filter/filter.component';
import  {  FilteringField  }  from  '../filter/condition';
import  {  FilterFieldsService  }  from  './filter-fields.service';
import  {  ODataExpressionBuilder,  DefaultExpressionBuilder  }  from  '../filter/expressionBuilders';

@Component({
	selector:  'my-app',
	templateUrl:  './app.component.html',
	styleUrls:  [  './app.component.css'  ]
})
export  class  AppComponent  {
	@ViewChild("filter") filter:FilterComponent;
	fieldsMetadata:FilteringField[];
	odataQuery:string;
	normalQuery:string; 

constructor(){
	this.fieldsMetadata = new Array<FilteringField>(
			FilteringField.CreateDate("birthday",  "Birthday"),
			FilteringField.CreateString("name",  "Name"),
			FilteringField.CreateNumeric("age",  "Age")
		); 
}

search():void  {
	let odataExpressionBuilder =  new  ODataExpressionBuilder();
	this.filter.buildExpression(odataExpressionBuilder);
	this.odataQuery = odataExpressionBuilder.BuildExpression();  

	let normalExpressionBuilder =  new  DefaultExpressionBuilder();
	this.filter.buildExpression(normalExpressionBuilder);
	this.normalQuery = normalExpressionBuilder.BuildExpression();
}

clearFilters():void  {
	this.filter.clear();
} 

}
```
```html
<h1>Query builder control - test form</h1>
<div  class="form-group">
	<mc-filter [fields]="fieldsMetadata" #filter></mc-filter>
</div>
<!-- Buttons -->
<div  class="well">
	<div #footer  class="row row-eq-height">
		<div  class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
			<div  class="marginElement">
				<button  class="btn btn-primary fitcontainer pointer" (click)="search()">
				Search
				<span  class="fa fa-search"></span>
				</button>
			</div>
		</div>
		
		<div  class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
			<div  class="marginElement">
				<button  class="btn btn-primary fitcontainer pointer" (click)="clearFilters()">
				Clear Results
				</button>
			</div>
		</div>
	</div>
</div>

<div>
	<h3>Generated queries</h3>
	<p>Normal Query: {{normalQuery}}</p>
	<p>OData Query: {{odataQuery}}</p>
</div>
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEzNDI0MDQwMTMsMTM3MDI0ODc3LDE5NT
UxMDg3NjVdfQ==
-->