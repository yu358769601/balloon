// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

//const { ccclass, property } = cc._decorator;

interface IDictionary {
    add(key: string, value: any): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): any[];
}

//ccclass
export default class NDictionary {

    _keys: string[] = [];
    _values: any[] = [];
    constructor(init?: { key: string; value: any; }[]) {

        if (init == null) return;
        for (let x = 0; x < init.length; x++) {
            this[init[x].key] = init[x].value;
            this._keys.push(init[x].key);
            this._values.push(init[x].value);
        }
    }

    clear(): void {
        // for (let i: number = 0; i < this._keys.length; i++) {
        //     this.remove(this._keys[i]);
        //     i--
        // }
        for (let i: number = this._keys.length - 1; i >= 0; i--) {
            this.remove(this._keys[i]);
        }
        // this._keys.splice(0);
        // this._values.splice(0);
    }

    get Count(): number {
        return this._keys.length;
    }

    add(key: string, value: any) {
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    }

    remove(key: string) {
        let index = this._keys.indexOf(key);
        if (index >= 0) {
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
            delete this[key];
        }

    }

    keys(): string[] {
        return this._keys;
    }

    values(): any[] {
        return this._values;
    }

    containsKey(key: string) {

        if (typeof this[key] == "undefined") {
            return false;
        }

        return true;
    }

    toLookup(): IDictionary {
        return this;
    }
}
