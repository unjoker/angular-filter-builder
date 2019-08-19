# Filter Builder for Angular

Filter Builder is an angular module that allows the creation of filter expressions that can be target to different data providers like OData.

## Installation

Copy into your project

## Usage

```angular
import  {FilterComponent  }  from  '../filter/filter.component';
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

constructor(filterService:FilterFieldsService){
filterService.getFields().subscribe(result=>this.fieldsMetadata =result);
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

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjcwODMwMDQ4LDE5NTUxMDg3NjVdfQ==
-->