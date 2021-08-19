// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import ccLog from "../Log/ccLog";
import AllClickItem from "../../item/allClickItem";
import UtilsNode from "./UtilsNode";
import {DialogType, ItemPreType} from "../Type/enums";
import Emitter from "../Msg/Emitter";

const {ccclass, property} = cc._decorator;



@ccclass
export default class AllClick extends cc.Component {


    allClickItem : cc.Node = null

    onLoad () {
        this.removeEmitter()
        this.registerEmitter()
        // this.node.on(cc.Node.EventType.TOUCH_START,(event)=>{
        //
        //     // event.stopPropagation();
        //     this.count++
        //     if (this.count == 1) {
        //         ccLog.log("点击了 按下屏幕")
        //         this.minTime = 0
        //         this.tagTime = true
        //     }
        // },this)
        // this.node.on(cc.Node.EventType.TOUCH_END,(event)=>{
        //     ccLog.log("点击了 抬起屏幕")
        //     // event.stopPropagation();
        //     this.count = 0
        // },this)
        //全屏幕点击
        let touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            owner: this,
            onTouchBegan: async(event) => {
                // 做你想做的事情

                // this.minTime = 0
                // this.tagTime = true
                //

                if (this.allClickItem == null) {
                    let node = this.allClickItem = await UtilsNode.getNode(ItemPreType.全按屏幕点击块, this.node);
                    // node.getComponent("clickSpItem").setData({})
                    let n_pos=event.getLocation();
                    let location = this.node.convertToNodeSpaceAR( n_pos );
                    node.setPosition(location)
                    ccLog.log("全屏幕点击",location)
                }
                    if (this.allClickItem) {
                        let n_pos=event.getLocation();
                        let location = this.node.convertToNodeSpaceAR( n_pos );
                        this.allClickItem.setPosition(location)
                        this.allClickItem.getComponent(cc.BoxCollider).enabled = true
                }
                // let p = Tools.convetOtherNodeSpace(node,this.node)
                // // ccLog.log("点击了 按下屏幕",p)
                // node.setPosition(p)
            },
            onTouchMoved: async(event) =>{
                if (this.allClickItem) {
                    let n_pos=event.getLocation();
                    let location = this.node.convertToNodeSpaceAR( n_pos );
                    this.allClickItem.setPosition(location)
                }

            },
            onTouchEnded: async(event) =>{
                if (this.allClickItem) {
                    this.allClickItem.setPosition(cc.v2(0,0))
                    this.allClickItem.getComponent(cc.BoxCollider).enabled = false
                }
            },
            onTouchCancelled: async(event) =>{
                if (this.allClickItem) {
                    this.allClickItem.setPosition(cc.v2(0,0))
                    this.allClickItem.getComponent(cc.BoxCollider).enabled = false
                }
            },

            // onTouchMoved: _touchMoveHandler,
            // onTouchEnded: _touchEndHandler,
            // onTouchCancelled: _touchCancelHandler
        });
        cc.internal.eventManager.addListener(touchListener, -1);

        //
        // let countDownCb = () =>{
        //     if (this.tagTime == true) {
        //         this.minTime++
        //         if (this.minTime%this.maxTime == 0) {
        //             // ccLog.log("点击了 按下屏幕 之后开始播放")
        //             // Emitter.fire('onStopClick')
        //         }
        //     }
        //
        // }
        // this.schedule(countDownCb, 1);
        //


    }

   async onFlyAD(selfName,type){
        let node = this.allClickItem = await UtilsNode.getNode(ItemPreType.全按屏幕点击块, this.node);
    }


    start () {

    }

    removeEmitter() {
        Emitter.remove('onCollisionEnterByControlAllClickCollision', this.onCollisionEnterByControlAllClickCollision, this)
        Emitter.remove('onFlyAD', this.onFlyAD, this)
    }

    registerEmitter() {
        Emitter.register('onCollisionEnterByControlAllClickCollision', this.onCollisionEnterByControlAllClickCollision, this)
        Emitter.register('onFlyAD', this.onFlyAD, this)
    }

    onCollisionEnterByControlAllClickCollision(selfName,sendData){
        ccLog.log("撞到了 碰撞 "," 肇事者 ",sendData.self," 受害者 ",sendData.other)
        if (sendData.other.node.name == "btn_click") {
            Emitter.fire("onCodeBtnClickByNativeAdDialog")
        }else if (sendData.other.node.name == "btn_click_fly") {
            Emitter.fire("onCodeBtnClickByItemFlyAD")
        }

    }

    protected onDestroy() {
        this.removeEmitter()
    }

    update (dt) {
        // if (this.tagTime == true) {
        //     this.minTime+=dt
        //     if (this.minTime%this.maxTime == 0) {
        //         // this.count = 0
        //         // this.minTime = 0
        //         // this.tagTime = false
        //         Emitter.fire('onStopClick')
        //     }
        // }
    }
}
