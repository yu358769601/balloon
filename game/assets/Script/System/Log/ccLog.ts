export default class ccLog{
    static logTag : boolean = true
    static log(msg: string|any, ...subst: any[]){
        if (this.logTag) {
            cc.log.apply(cc,arguments);
        }

    }

}
