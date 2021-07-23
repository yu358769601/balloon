// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import {instance, JoystickType, JoystickTypes} from "../../scripts/Joystick";
import GetNode, {GetNodeType} from "../System/Utils/getNode";
import Vec2 = cc.Vec2;
import Size = cc.Size;
import {DialogType, ItemPreType} from "../System/Type/enums";
import ItemBase from "./itemBase";

const {ccclass, property} = cc._decorator;


@ccclass
export default class ItemLine extends ItemBase {
//棍子


    data: any = null

    // LIFE-CYCLE CALLBACKS:
    @property({
        displayName: "本身编号",
        tooltip: "本身编号",
        // type: cc.Integer
    })
    index: string = ""
    @property({
        displayName: "起点节点",
        tooltip: "起点节点",
        type: cc.Node
    })
    startNode: cc.Node = null
    @property({
        displayName: "终点节点",
        tooltip: "终点节点",
        type: cc.Node
    })
    endNode: cc.Node = null


    @property({
        displayName: "长度有多少组",
        tooltip: "长度有多少组",
        // type: cc.Node
    })
    group: number = 1
    @property({
        displayName: "每组有多长",
        tooltip: "每组有多长",
        // type: cc.Node
    })
        //默认 高32 宽52
    groupWidthLength: number = 52

    @property({
        displayName: "每组有多宽",
        tooltip: "每组有多宽",
        // type: cc.Node
    })
        //默认 高32 宽52
    groupHeightLength: number = 32


    中距离: cc.Node = null
    中皮肤: cc.Node = null
    外皮: cc.Node = null


    private moveDir: cc.Vec2;

    //开始游戏
    onStartGame(selfName, startNode) {
        this.startNode = startNode
        this.node.setPosition(this.startNode.getPosition())

        this.index = this.startNode.getComponent("itemPoint").index


        this.onSetWideth(null, null)


    }

    //
    setData(data) {
        this.data = data
        this.initView()

        this.initNode()

        ccLog.log("setData 我是操作棍我现在的data是 ", this.data)
    }

    initNode() {
        this.node.angle = this.data.rotation

        this.node.zIndex = this.data.zIndex


    }


    //设置宽高
    onSetWideth(selfName, data) {
        if (data) {
            this.groupWidthLength = data.width
            this.groupHeightLength = data.height
        }
        this.中距离.width = this.groupWidthLength * this.group
        this.中距离.height = this.groupHeightLength

        this.中皮肤.width = this.groupWidthLength * this.group
        this.外皮.width = this.groupWidthLength * this.group


        let boxCollider = this.中距离.getComponent(cc.BoxCollider)
        boxCollider.offset = new Vec2(this.中距离.width / 2, 0)
        boxCollider.size = new Size(this.中距离.width, this.中距离.height)


        let newdata = {
            index2: this.index,
        }
        Emitter.fire("onEndNodeShow", newdata)


        ccLog.log("关于长度", " 整体长度 ", this.node.width, " 中距离长度 ", this.中距离.width, " 中皮肤长度 ", this.中皮肤.width, " 外皮长度 ", this.外皮.width)


    }


    onLoad() {
        this.removeEmitter()
        this.registerEmitter()


        instance.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        instance.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        instance.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchStart(event: cc.Event.EventTouch, data) {
        Emitter.fire("onLineTOUCH_START")

    }

    onTouchMove(event: cc.Event.EventTouch, data) {
        // this._speedType = data.speedType;
        this.moveDir = data.moveDistance;
    }

    onTouchEnd(event: cc.Event.EventTouch, data) {
        // this._speedType = data.speedType;
        Emitter.fire("onLineTOUCH_END")
    }

    protected onDestroy(): void {
        this.removeEmitter()
    }

    initView() {
        let data
        data = {
            type: GetNodeType.纯查找,
            otherData: "中距离",
            parentNode: this.node
        }
        this.中距离 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "中皮肤",
            parentNode: this.node
        }
        this.中皮肤 = GetNode.getNode(data)
        data = {
            type: GetNodeType.纯查找,
            otherData: "外皮",
            parentNode: this.node
        }
        this.外皮 = GetNode.getNode(data)
    }


    removeEmitter() {
        Emitter.remove('onLineAngleLeft', this.onLineAngleLeft, this)
        Emitter.remove('onLineAngleRight', this.onLineAngleRight, this)
        Emitter.remove('onLineTOUCH_START', this.onLineTOUCH_START, this)
        Emitter.remove('onLineTOUCH_END', this.onLineTOUCH_END, this)
        Emitter.remove('onCollisionEnterByControlCheckLineCollision', this.onCollisionEnterByControlCheckLineCollision, this)
        Emitter.remove('onCollisionExitByControlCheckLineCollision', this.onCollisionExitByControlCheckLineCollision, this)
        Emitter.remove('onCollisionStayByControlCheckLineCollision', this.onCollisionStayByControlCheckLineCollision, this)
        Emitter.remove('onStartGame', this.onStartGame, this)
        Emitter.remove('onAddGroup', this.onAddGroup, this)
        Emitter.remove('onSetGroup', this.onSetGroup, this)
        Emitter.remove('onJoystick', this.onJoystick, this)

    }

    registerEmitter() {
        Emitter.register('onLineAngleLeft', this.onLineAngleLeft, this)
        Emitter.register('onLineAngleRight', this.onLineAngleRight, this)
        Emitter.register('onLineTOUCH_START', this.onLineTOUCH_START, this)
        Emitter.register('onLineTOUCH_END', this.onLineTOUCH_END, this)
        Emitter.register('onCollisionEnterByControlCheckLineCollision', this.onCollisionEnterByControlCheckLineCollision, this)
        Emitter.register('onCollisionExitByControlCheckLineCollision', this.onCollisionExitByControlCheckLineCollision, this)
        Emitter.register('onCollisionStayByControlCheckLineCollision', this.onCollisionStayByControlCheckLineCollision, this)
        Emitter.register('onStartGame', this.onStartGame, this)
        Emitter.register('onAddGroup', this.onAddGroup, this)
        Emitter.register('onSetGroup', this.onSetGroup, this)
        Emitter.register('onJoystick', this.onJoystick, this)

    }

    onJoystick(selfName, direction) {
        let moveCount = 1
        ccLog.log("现在棍子的 面向角度", this.node.angle, direction)

        if (this.node.angle == 0) {
            this.node.angle = 360
        }
        if (this.node.angle > 360) {
            this.node.angle = 1
        }


        // 右 0 上 90   左 180 下 270
        switch (direction) {
            case JoystickTypes.左:
                // ccLog.log("现在棍子的 面向角度", this.node.angle , "左面上线",90)

                if (this.node.angle > 0 && this.node.angle < 180) {
                    // if (this.node.angle+0.5 > 360) {
                    //     this.node.angle+=0.5
                    //     this.node.angle = 0
                    // }
                    this.node.angle += moveCount
                    break;
                }
                if (this.node.angle >= 180 && this.node.angle < 360) {
                    // if (this.node.angle+0.5 > 360) {
                    //     this.node.angle+=0.5
                    //     this.node.angle = 0
                    // }
                    this.node.angle -= moveCount
                    break;
                }


                break;
            case JoystickTypes.上:


                if (this.node.angle > 0 && this.node.angle < 90) {
                    // if (this.node.angle+0.5 > 360) {
                    //     this.node.angle+=0.5
                    //     this.node.angle = 0
                    // }
                    this.node.angle += moveCount
                    break;
                }
                if (this.node.angle >= 90 && this.node.angle < 180) {
                    // if (this.node.angle+0.5 > 360) {
                    //     this.node.angle+=0.5
                    //     this.node.angle = 0
                    // }
                    this.node.angle -= moveCount
                    break;
                }
                if (this.node.angle > 180 && this.node.angle < 270) {
                    // if (this.node.angle+0.5 > 360) {
                    //     this.node.angle+=0.5
                    //     this.node.angle = 0
                    // }
                    this.node.angle -= moveCount
                    break;
                }
                if (this.node.angle > 270 && this.node.angle < 360) {
                    // if (this.node.angle+0.5 > 360) {
                    //     this.node.angle+=0.5
                    //     this.node.angle = 0
                    // }
                    this.node.angle += moveCount
                    break;
                }
            case JoystickTypes.右:
                if (this.node.angle > 0 && this.node.angle <= 180) {
                    // if (this.node.angle+0.5 > 360) {
                    //     this.node.angle+=0.5
                    //     this.node.angle = 0
                    // }
                    this.node.angle -= moveCount
                    break;
                }
                if (this.node.angle > 180 && this.node.angle <= 270) {
                    // if (this.node.angle+0.5 > 360) {
                    //     this.node.angle+=0.5
                    //     this.node.angle = 0
                    // }
                    this.node.angle += moveCount
                    break;
                }

                if (this.node.angle > 270) {
                    // if (this.node.angle+0.5 > 360) {
                    //     this.node.angle+=0.5
                    //     this.node.angle = 0
                    // }
                    this.node.angle += moveCount
                    break;
                }

                // if (this.node.angle <= 0) {
                //     this.node.angle+=0.5
                // }else{
                //     this.node.angle-=0.5
                // }
                break;
            case JoystickTypes.下:
                // if (this.node.angle <= 270) {
                //     this.node.angle+=0.5
                // }else {
                //     this.node.angle -= 0.5
                // }

                if (this.node.angle < 0 && this.node.angle > 270) {
                    this.node.angle -= moveCount
                    break;
                }
                if (this.node.angle < 360 && this.node.angle > 270) {
                    this.node.angle -= moveCount
                    break;
                }


                if (this.node.angle < 90 && this.node.angle > 0) {
                    this.node.angle -= moveCount
                    break;
                }

                if (this.node.angle >= 90 && this.node.angle <= 180) {
                    this.node.angle += moveCount
                    break;
                }


                if (this.node.angle > 180 && this.node.angle <= 270) {
                    // if (this.node.angle+0.5 > 360) {
                    //     this.node.angle+=0.5
                    //     this.node.angle = 0
                    // }
                    this.node.angle += moveCount
                    break;
                }
                if (this.node.angle > 270 && this.node.angle <= 360) {
                    // if (this.node.angle+0.5 > 360) {
                    //     this.node.angle+=0.5
                    //     this.node.angle = 0
                    // }
                    this.node.angle -= moveCount
                    break;
                }


                break;
        }

    }

    start() {

    }

    onLineAngleLeft(selfName) {
        this.node.angle += 2
    }

    onLineAngleRight(selfName) {
        this.node.angle -= 2
    }

    onLineTOUCH_START(selfName) {
        this.endNode = null
    }

    onLineTOUCH_END(selfName) {


        ccLog.log("走我了", " this.endNode ", this.endNode, " this.startNode ", this.startNode)

        if (this.endNode == null) {

        } else {
            // if (this.checkNode1 == null) {
            //
            // }
            if (this.startNode != null && this.endNode != null) {
                // Emitter.fire("onShowTempLine", this.startNode.getComponent("itemPoint").index)
                //设置临时显示

                if (this.startNode != this.endNode) {
                    ccLog.log("编号 棍子", this.index, " 落点 ", this.endNode.getComponent("itemPoint").index)

                    let index1 = this.index
                    let index2 = this.endNode.getComponent("itemPoint").index


                    //设置落点
                    this.node.setPosition(this.endNode.getPosition())
                    this.startNode = this.endNode

                    this.index = this.endNode.getComponent("itemPoint").index
                    // ccLog.log("我要爆炸了 1 ", "起点单位", this.startNode, "落点单位", this.endNode)

                    let data = {
                        index1: index1,
                        index2: index2
                    }

                    Emitter.fire("onEndNodeShow", data)


                    let getKeyData = {
                        // index1 :index1,
                        // index2 : index2,
                        index: index2,
                        self: this,
                        callBack: this.getKeyCallBack
                    }
                    Emitter.fire("onGetKey", getKeyData)
                } else {
                    ccLog.log("我要爆炸了 2")
                }
            }
            // ccLog.log("我要爆炸了 0 ", "起点单位", this.startNode, "落点单位", this.endNode)


        }
    }

    getKeyCallBack(data, key) {
        ccLog.log("现在这个位置有钥匙 ", " data ", data, " key ", key)

        if (key.node) {
            key.node.destroy()
        }


    }


    async onCollisionEnterByControlCheckLineCollision(selfName, sendData) {
        // let sendData = {
        //     other,
        //     self,
        // }
        // ccLog.log("撞到了 碰撞 "," 受害者 ",sendData.self," 肇事者 ",sendData.other)
        //大哥布林
        // if (sendData.self.getComponent("beatingSlime")) {
        //     ccLog.log("史莱姆 进来了"," 肇事者 ",sendData.self)
        //     sendData.self.getComponent("beatingSlime").setInTag(true)
        // }

        //进入范围提示
        // sendData.self.node.getComponent("itemPoint").标记.active = true

        ccLog.log("突然闯入", sendData.self.node.getComponent("itemPoint").标记.active)
        if (sendData.self.node.getComponent("itemPoint").标记.active == true) {
            this.endNode = sendData.self.node
        }

    }

    onCollisionStayByControlCheckLineCollision(selfName, sendData) {
        if (sendData.self.node.getComponent("itemPoint").标记.active == true) {
            this.endNode = sendData.self.node
        }
    }

    onCollisionExitByControlCheckLineCollision(selfName, sendData) {
        // ccLog.log("撞到了 退出 碰撞 "," 受害者 ",sendData.self," 肇事者 ",sendData.other)
        //出去范围提示
        // sendData.self.node.getComponent("itemPoint").标记.active = false

        if (sendData.self.node.getComponent("itemPoint").标记.active == true) {
            this.endNode = null
        }
    }

    move() {
        if (this.moveDir != null) {


            // ccLog.log("角度问题 0 ",this.moveDir.y, this.moveDir.x)
            // ccLog.log("角度问题 1 ",Math.atan2(this.moveDir.y, this.moveDir.x))
            // ccLog.log("角度问题 2 ",cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x)))
            //
            //

            // this.node.angle = (cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x))) * 1;

            // this.node.angle+=Math.atan2(this.moveDir.y, this.moveDir.x)
            //
            // ccLog.log("角度问题 3 ",this.node.angle)


        }


    }


    onAddGroup(selfName, group) {


        if (this.group + group <= 0) {
            ccLog.log("游戏结束")
            this.group += group
            this.onSetWideth(null, null)
            // let cllbacks = {
            //     // self : this,
            //     successfulCallback: this.successfulCallback,
            //     failureCallback: this.failureCallback
            // }
            // myNowPassRubber : UtilsDB.getMyNowPassRubber(),
            // data.myNowPassRubber = UtilsDB.getMyNowPassRubber()
            // data.self = this
            // Emitter.fire("onOpenDialog", {name: DialogType.结算界面, zIndex: 100,data : this.data}, null)
            Emitter.fire("onGameOverCall")
        } else {
            this.group += group
            this.onSetWideth(null, null)
            ccLog.log("我现在要设置多少组 减少之后", this.group, "距离", this.中距离.width)
        }

    }

    onSetGroup(selfName, group) {
        this.group = group
        this.onSetWideth(null, null)
        ccLog.log("我现在要设置多少组", this.group, "距离", this.中距离.width)
    }


    update(dt) {
        this.move();
    }

    setEdit(editData) {
        this.addComponent("controlMaterial").setData(editData)
        // //编辑点的时候要有 图片
        this.getComponent(cc.Sprite).enabled = true
        ccLog.log("我是 操作棍我需要高亮 我需要被点击")
    }

    setEditData(editData) {
        this.editData = editData
        this.initView()
        this.addComponent("controlMaterial").setData(editData)

        //编辑点的时候要有 图片
        this.getComponent(cc.Sprite).enabled = true
        //新创建的
        let data = {
            typeName: ItemPreType.操作棍,
            index: 0,
            rotation: 0,
            x: editData.position.x,
            y: editData.position.y,
            zIndex: 0
        }
        this.data = data
        this.initNode()
        ccLog.log("setEditData 我是操作棍我现在的data是 ", this.data)
    }

}