/**
 *  可点击对象计时器. 用于控制按钮重复点击频率.
 */

class Clickable {

    public set isOk(done: boolean) {
        this._isOk = done;
    }

    public get isOk(): boolean {
        if (this.debug && !this._isOk) {
            console.warn("按钮点击过快:" + this.uuid);
        }
        return this._isOk;
    }

    public debug: boolean = false;
    protected uuid: string = null;
    protected _isOk: boolean = false;

    constructor(uuid: string) {
        this.uuid = uuid;
    }
}

/**
 * 计时类点击对象. 最小间隔0.5
 */
class TimerClickable extends Clickable {
    protected st: number = 0;
    // 最小间隔:0.5s.
    protected clickSpacing: number = 200;

    public initClickSpacing(space: number) {
        this.clickSpacing = (space < 0 ? 0.1 : space) * 1000;
    }

    public get isOk(): boolean {
        this.checkOk();

        if (this.debug && !this._isOk) {
            cc.warn("按钮点击过快:" + this.uuid);
        }
        return this._isOk;
    }

    private checkOk() {
        if (Date.now() - this.st > this.clickSpacing) {
            this._isOk = true;
            this.st = Date.now();
        } else {
            this._isOk = false;
        }
    }
}

class ClickableMgr {

    private clickables = {};
    private defaultClickable = new Clickable("undefined");
    private _debugable = true;

    // 最小间隔:0.5s.
    private readonly clickSpacing: number = 0.5;

    public get(event: cc.Event): Clickable {
        let uuid = null;
        if (event.target instanceof cc.Node) {
            uuid = event.target.uuid;
        }
        return this._get(uuid);
    }

    // 获取计时器类点击对象.
    public getT(event: cc.Event): Clickable {
        return this.get(event);
    }

    // 直接获取相应节点的点击对象.
    public getN(node: cc.Node): Clickable {
        return this._get(node.uuid);
    }

    private _get(uuid): Clickable {
        if (!uuid) {
            return this.defaultClickable;
        }
        let clickable = this.clickables[uuid];
        if (!clickable) {
            clickable = new TimerClickable(uuid);
            this.clickables[uuid] = clickable;
            clickable.initClickSpacing(this.clickSpacing);
        }
        clickable.debug = this._debugable;
        return clickable;
    }

    public setT(node: cc.Node, span: number) {
        const clickable = this.getN(node);
        if (clickable instanceof TimerClickable) {
            clickable.initClickSpacing(span);
        }
    }
}

// 导出一个简易的常量.
export const C = new ClickableMgr();
