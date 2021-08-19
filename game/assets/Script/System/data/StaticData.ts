

// const { ccclass, property } = cc._decorator;


import Singleton from "./Singleton";
import NDictionary from "./NDictionary";

export default class StaticData extends Singleton {

    private static instance: StaticData;
    public static getInstance(): StaticData {
        if (!this.instance) {
            this.instance = new StaticData();
        }
        return this.instance;
    }

    private dataMap: NDictionary = new NDictionary([]);

    public addData(url: string, asset: any) {
        this.dataMap[url] = asset;
    }
    public addDatas(url: string[], assets: any[]) {
        for (var i: number = 0; i < assets.length; i++) {
            StaticData.getInstance().addData(url[i], assets[i]);
        }
    }

    public containsTable(name: string)
    {
        return this.dataMap.containsKey(name)
    }

    public getData(path: string, id: string): any {
    
        if (!this.dataMap.containsKey(path)) {
            return null;
        }
    
        return this.dataMap[path][id];
    }
    public getRow(tableName: string, id: string | number): any
    {
        id = id.toString()
        if (!this.dataMap.containsKey(tableName)) 
        {
            return null;
        }
        return this.dataMap[tableName][id]; 
    }
    public getCell(tableName: string, id: string | number, field: string): any
    {
        let row = this.getRow(tableName, id)
        if(row == null)
        {
            return null
        } 
        return row[field]
    }
    public getDataKeyValue(path: string): any {
        if (!this.dataMap.containsKey(path)) {
            console.log("path not find:" + path);
            return null;
        }
        return this.dataMap[path];
    }
    public getDataKV(path: string, key: string): any {
        if (!this.dataMap.containsKey(path)) {
            console.log("path not find:" + path);
            return null;
        }
        return this.dataMap[path][key];
    }
    public getDataLst(path: string): any[] {
        let lst: any[] = [];
        if (!this.dataMap.containsKey(path)) {
            return lst;
        }
        for (let val in this.dataMap[path]) {
            lst.push(this.dataMap[path][val]);
        }
        return lst;
    }
    
}
