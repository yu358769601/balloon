// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseDialog from "../dialog/BaseDialog";
import BaseDialogNoAd from "../dialog/BaseDialogNoAd";
import UtilsAction from "../System/Utils/UtilsAction";
import ccLog from "../System/Log/ccLog";
import UtilsNode from "../System/Utils/UtilsNode";
import {ItemPreType} from "../System/Type/enums";
import Utils from "../System/Utils/Utils";
import Vec2 = cc.Vec2;
import Emitter from "../System/Msg/Emitter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AddGem extends BaseDialogNoAd {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    private data: any;
    private callbacks: any;
    private 加钱: cc.Label;


    goldNodeList : cc.Node[] = []

    onLoad () {
        super.onLoad()
    }

    start () {
        super.start()
    }

    initCallback(callbacks) {
        this.callbacks = callbacks
        // this.callbacks.ItemPreTypesuccessfulCallback
    }

    registerEmitter() {
    }

    removeEmitter() {
    }
    initView(){
        let  data
        // data = {
        //     type: ControlNodeType.纯查找,
        //     otherData: "加钱",
        //     parentNode: this.node,
        // }
        // this.加钱 = ControlNode.getNode(data).getComponent(cc.Label)
    }
    async setData(data) {
        this.data = data
        this.initView()
        ccLog.log("我展示了吗 1 ",data)
        // this.callbacks.ItemPreTypesuccessfulCallback

        // this.加钱.string = "+"+data.data.count
        // UtilsAction.moveByeaseElasticOut(this.node,2,0,200,()=>{
        //     if (this.callbacks) {
        //         if (this.callbacks.ItemPreTypesuccessfulCallback) {
        //             this.callbacks.ItemPreTypesuccessfulCallback(data)
        //         }
        //     }
        // })


        // goldNodeList.sort(node => node.dis);
        //
        // goldNodeList.forEach((node, idx) => {
        //     node.gold.runAction(cc.sequence(
        //         cc.moveTo(0.3, node.startPoint),
        //         cc.delayTime(idx * 0.03),
        //         cc.moveTo(0.6, node.endPoint),
        //         cc.callFunc(() => {
        //             this.goldPool.put(node.gold);
        //         })
        //     ))
        // });


        Emitter.fire("onAssetsAddGemGetP",this,async (self,p)=>{


            let count = 20
            let temp =   this.getCirclePoints(300,new cc.Vec2(0,0),count,60)
            for (let i = 0; i < count; i++) {
                let item =  await UtilsNode.getNode(ItemPreType.加钱条目,this.node)
                // item.setPosition(temp[i])
                this.goldNodeList.push(item)
                let addGemItem = item.getComponent(ItemPreType.加钱条目)
                addGemItem.startPoint = temp[i]
                addGemItem.endPoint = p


            }
            // this.goldNodeList.sort(node => node.dis);

            this.goldNodeList.forEach((node, idx) => {
                let addGemItem = node.getComponent(ItemPreType.加钱条目)


                node.runAction(cc.sequence(
                    cc.moveTo(0.3, addGemItem.startPoint),
                    cc.delayTime(0.5),
                    // cc.delayTime(idx * 0.03),
                    cc.moveTo(0.8, addGemItem.endPoint),
                    cc.callFunc(() => {
                        // this.goldPool.put(node.gold);
                        node.destroy()
                    })
                ))
            });





            ccLog.log("什么坐标",temp)

            await Utils.setTimerOnce(this,2)
                if (this.callbacks) {
                    if (this.callbacks.ItemPreTypesuccessfulCallback) {
                        this.callbacks.ItemPreTypesuccessfulCallback(data)
                    }
                }
            this.node.destroy()

        })



    }

    subclassCall(): any {
        return this
    }
    /**
     * 以某点为圆心，生成圆周上等分点的坐标
     *
     * @param {number} r 半径
     * @param {cc.Vec2} pos 圆心坐标
     * @param {number} count 等分点数量
     * @param {number} [randomScope=80] 等分点的随机波动范围
     * @returns {cc.Vec2[]} 返回等分点坐标
     */
    getCirclePoints(r: number, pos: cc.Vec2, count: number, randomScope: number = 60): cc.Vec2[] {
        let points = [];
        let radians = (Math.PI / 180) * Math.round(360 / count);
        for (let i = 0; i < count; i++) {
            let x = pos.x + r * Math.sin(radians * i);
            let y = pos.y + r * Math.cos(radians * i);
            points.unshift(cc.v3(x + Math.random() * randomScope, y + Math.random() * randomScope, 0));
        }
        return points;
    }
    // update (dt) {}
}
