// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemPoint extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    @property({
        displayName: "本身编号",
        tooltip: "本身编号",
        type: cc.Integer
    })
    index : number = 0


    @property({
        displayName: "允许进入的编号",
        tooltip: "允许进入的编号",
        type: cc.Integer
    })
    allowInIndexs : number[] = []
    //记录
    allowInIndexsSet : number[] = []



    onLoad () {

    }

    start () {

    }

    // update (dt) {}
}
