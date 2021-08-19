// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class BasePass extends cc.Component {
    @property({
        displayName: "开始需要隐藏的节点们",
        tooltip: "开始需要隐藏的节点们",
        type: [cc.Node]
    })
    public startyincangs: cc.Node[] = []
    @property({
        displayName: "开始需要显示的节点们",
        tooltip: "开始需要显示的节点们",
        type: [cc.Node]
    })
    public startxianshis: cc.Node[] = []



    @property({
        displayName: "结束需要隐藏的节点们",
        tooltip: "结束需要隐藏的节点们",
        type: [cc.Node]
    })
    public endyincangs: cc.Node[] = []
    @property({
        displayName: "结束需要显示的节点们",
        tooltip: "结束需要显示的节点们",
        type: [cc.Node]
    })
    public endxianshis: cc.Node[] = []

    onDestroy(): void {
        // ccLog.log("清除")
        this.removeEmitter()
        this.removeBaseEmitter()
    }
    removeBaseEmitter(){
        // Emitter.remove('onEnterCheckPointEnd', this.onEnterCheckPointEnd,this)
        // Emitter.remove('onEnterCheckPointStart', this.onEnterCheckPointStart,this)
    }
    registerBaseEmitter(){
        // Emitter.register('onEnterCheckPointEnd', this.onEnterCheckPointEnd,this)
        // Emitter.register('onEnterCheckPointStart', this.onEnterCheckPointStart,this)

    }

    abstract removeEmitter()
    abstract registerEmitter()

    abstract startGame()
    abstract endGame()
    abstract initView()

    abstract setData(data)
    onLoad () {
        this.removeEmitter()
        this.removeBaseEmitter()
        this.registerEmitter()
        this.registerBaseEmitter()
    }

    start () {

    }

    //开始的时候调用的
    startGameView() {
        this.startyincangs.forEach((item) => {
            if (item) {
                item.active = false
            }

        });
        this.startxianshis.forEach((item) => {
            if (item) {
                item.active = true
            }

        });

    }

    //结束的时候调用的
    endGameView() {
        this.endyincangs.forEach((item) => {
            if (item) {
                item.active = false
            }

        });
        this.endxianshis.forEach((item) => {
            if (item) {
                item.active = true
            }

        });

    }
    // update (dt) {}
}
