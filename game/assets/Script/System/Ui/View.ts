
const { ccclass, property } = cc._decorator;

@ccclass
export default class View extends cc.Component {

    @property
    needFullScreenBk:boolean = false;

    param: string
    private _active: boolean
    private _data: any

    get active(): boolean {
        return this._active
    }
    set active(value: boolean) {
        if (this._active == value) return
        this._active = value
        //this.enabled = value
        this.node.active = value
        
        if (value) {
            this.onActive()
        }
        else {
            this.onInactive()
        }
    }
    set setData(data: any) {
        this._data = data
        this.onSetData()
    }
    get getData(): boolean {
        return this._data
    }
    //protected _depth: number
    get depth(): number {
        return this.node.zIndex;
    }
    set depth(value: number) {
        this.node.zIndex = value;
        //this._depth = value;
    }

    // 当被(UIService)创建时调用
    onCreate(data): void { }
    onFrameUpdate(): void { }
    protected onActive(): void { }
    protected onInactive(): void { }
    //现在不是最上面
    protected onNotTopStack(): void {

    }

    //如果有数据走这个生命周期方法
    protected onSetData(): void { }
}
