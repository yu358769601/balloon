// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../Msg/Emitter";
import ccLog from "../Log/ccLog";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DrawLine extends cc.Component {

    // @property(cc.Graphics)
    draw: cc.Graphics = null;
    @property({
        tooltip: "是否开启"
    })
    WhetherOpen: boolean = true;
    @property({
        tooltip: "间距:宽"
    })
    drawWidth: string = '0';
    @property({
        tooltip: "间距:高"
    })
    drawHeight: string = '0';

    @property({
        tooltip: "位置:X"
    })
    drawX: string = '0';
    @property({
        tooltip: "位置:Y"
    })
    drawY: string = '0';
    @property({
        tooltip: "小方格数量"
    })
    CheckTheNumber: string = '10';
    // @property({
    //     tooltip: "小方格横距"
    // })
    // grid_rows: string = '10';

     onDestroy() {
         this.removeEmitter()
    }

    onLoad() {
        this.removeEmitter()
        this.registerEmitter()
    }

    removeEmitter(){
        Emitter.remove("onSetShowDrawLine",this.onSetShowDrawLine,this)
        Emitter.remove("onSetDrawLineWidthHeight",this.onSetDrawLineWidthHeight,this)
     }
     registerEmitter(){
         Emitter.register("onSetShowDrawLine",this.onSetShowDrawLine,this)
         Emitter.register("onSetDrawLineWidthHeight",this.onSetDrawLineWidthHeight,this)
     }




    onSetShowDrawLine(selfName,b){

        if (this.WhetherOpen == true) {
            this.draw.node.active = false
            this.WhetherOpen = false
        }else{
            this.draw.node.active = true
            this.WhetherOpen = true
        }

        ccLog.log("现在是设置了什么",this.WhetherOpen)
    }
    //设置格子的宽高
    onSetDrawLineWidthHeight(selfName,data){
        this.drawWidth = data.drawWidth
        this.drawHeight = data.drawHeight
        this.startLine()
    }

    startLine(){
        this.draw.clear()
        let width = Number(this.drawWidth);
        let height = Number(this.drawHeight);

        let CheckTheNumber = Number(this.CheckTheNumber);
        // var grid_rows = Number(this.grid_rows);

        //描绘边框
        // var cell_height = height * grid_rows;
        // var cell_width = width * grid_cols;

        //准备画横线
        for (let col = 0; col <= CheckTheNumber; col++) {
            let x = col * width;
            this.draw.moveTo(x, 0);
            this.draw.lineTo(x, width * CheckTheNumber);
        }
        //准备画竖线
        for (let row = 0; row <= CheckTheNumber; row++) {
            let y = row * height;
            this.draw.moveTo(0, y);
            this.draw.lineTo(height * CheckTheNumber, y);
        }
        //完成描绘
        this.draw.stroke();
    }




    start() {
        this.draw = this.getComponent(cc.Graphics)

        this.draw.node.active = this.WhetherOpen;
        this.draw.node.x = Number(this.drawX);
        this.draw.node.y = Number(this.drawY);


       this.startLine()

    }

    // update (dt) {}
}
