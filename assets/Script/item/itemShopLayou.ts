// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemShopLayou extends cc.Component {

    data : any = null
    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    start () {

    }

    setData(data){
        this.data = data
    }

    // update (dt) {}
}
