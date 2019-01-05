export const dbMap = [{
    from: 2,
    to: 64,
    db: '-2',
    bod: -2
}, {
    from: 65,
    to: 84,
    db: '-1',
    bod: -1
}, {
    from: 85,
    to: 124,
    db: '0',
    bod: 0
}, {
    from: 125,
    to: 164,
    db: '1d4',
    bod: 1
}, {
    from: 165,
    to: 204,
    db: '1d6',
    bod: 2
}, {
    from: 205,
    to: 284,
    db: '2d6',
    bod: 3
}]

export const queryDB = function (value) {
    for(var item in dbMap){
        if(value>= item.from && value<=item.to){
            return {
                db: item.db,
                bod: item.bod
            };
        }
    }
    var exV = Math.ceil((value-284)/80);
    var v = (2+exV).toString();
    return {
        bod: 3+exV,
        db: v+"d6"
    }
}
