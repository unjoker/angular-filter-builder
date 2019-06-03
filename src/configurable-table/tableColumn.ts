
export class TableColumn{
    
    isVisible = true;

    constructor(public name:string, public displayName:string, public render:(any) => string){}

    public static Date(name:string, displayName:string){
        return new TableColumn(
            name, 
            displayName, 
            (obj)=> obj[name].toLocaleDateString({formatMatcher:"mediumDate"}));
    }    

    public static String(name:string, displayName:string){
        return new TableColumn(name, displayName, (obj)=>obj[name].toString());
    }

    public static Numeric(name:string, displayName:string){
        return new TableColumn(name, displayName,  (obj)=>obj[name].toString());
    }

    public static Link(name:string, displayName:string, urlPath:string){
        return new TableColumn(
            name,
            displayName, 
            (obj)=>`<a href='${urlPath}/${obj[name]}'>${obj[name]}</a>`);
    }
    
}

