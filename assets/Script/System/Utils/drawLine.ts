// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class draw extends cc.Component {

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

    start() {
        this.draw = this.getComponent(cc.Graphics)

        this.draw.node.active = this.WhetherOpen;
        let width = Number(this.drawWidth);
        let height = Number(this.drawHeight);
        this.draw.node.x = Number(this.drawX);
        this.draw.node.y = Number(this.drawY);
        var CheckTheNumber = Number(this.CheckTheNumber);
        // var grid_rows = Number(this.grid_rows);

        //描绘边框
        // var cell_height = height * grid_rows;
        // var cell_width = width * grid_cols;

        //准备画横线
        for (var col = 0; col <= CheckTheNumber; col++) {
            var x = col * width;
            this.draw.moveTo(x, 0);
            this.draw.lineTo(x, width * CheckTheNumber);
        }
        //准备画竖线
        for (var row = 0; row <= CheckTheNumber; row++) {
            var y = row * height;
            this.draw.moveTo(0, y);
            this.draw.lineTo(height * CheckTheNumber, y);
        }
        //完成描绘
        this.draw.stroke();

    }

    // update (dt) {}
}
