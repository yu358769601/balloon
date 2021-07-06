// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


const {ccclass, property} = cc._decorator;
// static qudao = platform_null;
// static qudao = platform_baidu;
// static qudao = platform_toutiao;
// static qudao = platform_vivo;
// static qudao = platform_oppo;
// static qudao = platform_meizu
// static qudao = platform_qq;
// static qudao = platform_Android;
// static qudao = Platform_ios;
// static qudao = platform_Android_oppo;
export enum ChannelBaseType {
    web = 0,
    oppo = 1,
    vivo = 2,
    meizu = 3,
    Android= 4,
    Android_oppo= 5,

}

@ccclass
export default abstract class ChannelBase extends cc.Component {

    @property({
        type: cc.Enum(ChannelBaseType),
        displayName: "当前平台管理",
        tooltip: "当前平台管理",
    })
    channelType = ChannelBaseType.web;




    onDestroy(): void {
        // ccLog.log("清除")
        this.removeEmitter()
        this.removeBaseEmitter()
    }

    removeBaseEmitter() {
        // Emitter.remove('onEnterCheckPointEnd', this.onEnterCheckPointEnd,this)
    }

    registerBaseEmitter() {
        // Emitter.register('onEnterCheckPointEnd', this.onEnterCheckPointEnd,this)

    }

    onLoad() {
        this.removeEmitter()
        this.removeBaseEmitter()
        this.registerEmitter()
        this.registerBaseEmitter()


    }
    abstract removeEmitter()

    abstract registerEmitter()

    abstract init( node: any)
    // update (dt) {}
}
