class DBConfig{
    from: number;
    to: number;
    db: string;
    bod: number;

    constructor(from:number,to:number,db:string,bod:number){
        this.from = from;
        this.to = to;
        this.db = db;
        this.bod = bod;
    }
}

const dbMap:DBConfig[] = [
    new DBConfig(2,64,'-2',-2),
    new DBConfig(65,84,'-1',-1),
    new DBConfig(85,124,'0',0),
    new DBConfig(125,164,'1d4',1),
    new DBConfig(165,204,'1d6',2),
    new DBConfig(205,284,'2d6',3)
]

export const queryDB = function (value:number) {
    for(let item of dbMap){
        if(value>= item.from && value<=item.to){
            return {
                db: item.db,
                bod: item.bod
            };
        }
    }
    var exV = Math.ceil(( value - 284)/80);
    var v = (2+exV).toString();
    return {
        bod: 3+exV,
        db: v+"d6"
    }
}
