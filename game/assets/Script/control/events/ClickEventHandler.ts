/**
 * 点击事件处理.
 */
import Common from "../Common";

enum State {
    IDLE = 0,
    PRESSED = 1,
    DRAGGED = 2,
    LONG_PRESSED = 3,
}

export class LifeCycleComp extends cc.Component {

    // 点击事件响应
    set onClick(v: (e: cc.Event | cc.Touch) => void) {
        this._onClick = v;
    }

    // 长按事件响应
    set onLongClick(v: (e: cc.Event | cc.Touch) => void) {
        this._onLongClick = v;
    }

    set onLongPressed(v: (nd: cc.Node, pos: cc.Vec2) => void) {
        this._onLongPressed = v;
    }

    set onPressed(v: (nd: cc.Node, pos: cc.Vec2) => void) {
        this._onPressed = v;
    }

    set target(t: any) {
        this._target = t;
    }

    get target(): any {
        return this._target;
    }

    // 拖拽事件响应
    set onDrag(v: (p: cc.Vec2, pDelta: cc.Vec2, pDistance: cc.Vec2) => void) {
        this._onDrag = v;
    }

    set onRelease(v: (nd: cc.Node, pos: cc.Vec2) => void) {
        this._onRelease = v;
    }

    get onClick(): (ev: cc.Event | cc.Touch) => void {
        return this._onClick;
    }

    get onLongClick(): (ev: cc.Event | cc.Touch) => void {
        return this._onLongClick;
    }

    get onLongPressed(): (nd: cc.Node, pos: cc.Vec2) => void {
        return this._onLongPressed;
    }

    get onPressed(): (nd: cc.Node, pos: cc.Vec2) => void {
        return this._onPressed;
    }

    public pressedAnimation: cc.Action = null;
    public releaseAnimation: cc.Action = null;

    public bubble: boolean = false;

    private _onClick: (ev: cc.Event | cc.Touch) => void = null;

    private _onLongClick: (ev: cc.Event | cc.Touch) => void = null;

    private _onDrag: (p: cc.Vec2, pDelta: cc.Vec2, pDistance: cc.Vec2) => void = null;

    private _onLongPressed: (nd: cc.Node, pos: cc.Vec2) => void = null;

    private _onPressed: (nd: cc.Node, pos: cc.Vec2) => void = null;
    private _onRelease: (nd: cc.Node, pos: cc.Vec2) => void = null;

    private _target: any = null;

    // 控件状态. normal, pressed, dragged,long_pressed
    private _state: number = State.IDLE;

    private _touchTimeStamp: number = 0;

    // 滑动Delta.
    private _touchDelta: cc.Vec2 = cc.v2();

    // 滑动总距离.
    private _moveDistance: cc.Vec2 = cc.v2();

    // 按压起点
    private _touchStartPos: cc.Vec2 = cc.v2();

    public onEnable() {
        this.on();
    }

    public onDisable() {
        this.off();
    }

    public on() {
        if (Common.isMobile) {
            this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
            this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
            this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
            this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
        } else {
            this.node.on(cc.Node.EventType.MOUSE_DOWN, this._onTouchStart, this);
            this.node.on(cc.Node.EventType.MOUSE_MOVE, this._onTouchMove, this);
            this.node.on(cc.Node.EventType.MOUSE_UP, this._onTouchEnd, this);
            this.node.on(cc.Node.EventType.MOUSE_LEAVE, this._onTouchCancel, this);
        }
    }

    // 清除组件绑定的各种事件.
    public off() {
        if (Common.isMobile) {
            this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
            this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
            this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
            this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
        } else {
            this.node.off(cc.Node.EventType.MOUSE_DOWN, this._onTouchStart, this);
            this.node.off(cc.Node.EventType.MOUSE_MOVE, this._onTouchMove, this);
            this.node.off(cc.Node.EventType.MOUSE_UP, this._onTouchEnd, this);
            this.node.off(cc.Node.EventType.MOUSE_LEAVE, this._onTouchCancel, this);
        }
        // this._onClick = null;
        // this._onLongClick = null;
        // this._onDrag = null;
    }

    public _onTouchStart(ev: cc.Touch) {
        this._state = State.PRESSED;
        this._touchTimeStamp = Date.now();
        this._touchDelta.x = this._touchDelta.y = 0;
        this._moveDistance.x = this._moveDistance.y = 0;
        this._touchStartPos.set(ev.getLocation());

        if (this._onPressed) {
            this._onPressed.call(this._target, this.node, ev.getLocation());
            if (ev instanceof cc.Event && !this.bubble) {
                ev.stopPropagation();
            }
        }
        this.scheduleOnce(this._checkLongPressed, 0.2);
        if (this.pressedAnimation && this.releaseAnimation) {
            this.node.runAction(this.pressedAnimation);
        }
        if (this._onClick) {
            if (ev instanceof cc.Event && !this.bubble) {
                ev.stopPropagation();
            }
        }
    }

    public _onTouchMove(ev: cc.Touch) {
        if (this._state == State.IDLE) {
            return;
        }

        // 累计移动距离.在非拖拽状态下,累计移动超过20像素时触发滑动监听.
        this._touchDelta.addSelf(ev.getDelta());
        this._moveDistance.addSelf(ev.getDelta());

        // 如果按下后移动距离过小.则不认为是滑动事件.
        if (this._state != State.DRAGGED &&
            Math.abs(this._touchDelta.x) < 10 && Math.abs(this._touchDelta.y) < 10) {
            return;
        }

        this._state = State.DRAGGED;
        if (this._onDrag) {
            this._onDrag.call(this._target, ev.getLocation(), this._touchDelta, this._moveDistance);
        }
        this._touchDelta.x = this._touchDelta.y = 0;
    }

    public _onTouchEnd(ev: cc.Touch) {
        if (this._state == State.LONG_PRESSED) {
            cc.log("长按状态.")
        } else if (this._state == State.PRESSED) {
            // 按压超过0.8秒即算是长按.
            if (Date.now() - this._touchTimeStamp > 200 && this._onLongClick) {
                this._onLongClick.call(this._target, ev);
            } else if (this._onClick) {
                this.onClicked(ev);

            }
        }
        if (this._onRelease) {
            this._onRelease.call(this._target, this.node, ev.getLocation())
        }
        if (ev instanceof cc.Event && !this.bubble) {
            ev.stopPropagation();
            ev.bubbles = false
        }
        this._state = State.IDLE;
        this.unschedule(this._checkLongPressed);
        // 动画应当成对出现,不应该仅存其一
        if (this.pressedAnimation && this.releaseAnimation) {
            this.node.runAction(this.releaseAnimation);
        }
    }

    public _onTouchCancel(ev: cc.Touch) {
        if (this._state == State.IDLE) {
            return;
        }
        if (this._onRelease) {
            this._onRelease.call(this._target, this.node, ev.getLocation())
        }
        if (ev instanceof cc.Event && !this.bubble) {
            ev.stopPropagation();
            ev.bubbles = false
        }
        this._state = State.IDLE;
        this.unschedule(this._checkLongPressed);
        // 动画应当成对出现,不应该仅存其一
        if (this.pressedAnimation && this.releaseAnimation) {
            this.node.runAction(this.releaseAnimation);
        }
    }

    public _checkLongPressed() {
        if (this._state == State.PRESSED && this._onLongPressed) {
            this._onLongPressed.call(this._target, this.node, this._touchStartPos);
            this._state = State.LONG_PRESSED
        }
    }

    private onClicked(ev: cc.Touch) {
        this._onClick.call(this._target, ev);
    }
}

export default class ClickEventHandler {
    private readonly node: cc.Node = null;
    private readonly lifeComp: LifeCycleComp = null;

    constructor(node: cc.Node) {
        this.node = node;
        if (!this.node) {
            return;
        }
        let comp = this.node.getComponent(LifeCycleComp);
        if (!comp) {
            comp = this.node.addComponent(LifeCycleComp);
        }
        this.lifeComp = comp;
        this.setBubble();
    }

    set pressedAnim(anim: cc.Action) {
        if (this.lifeComp) {
            this.lifeComp.pressedAnimation = anim;
        }
    }

    set releaseAnim(anim: cc.Action) {
        if (this.lifeComp) {
            this.lifeComp.releaseAnimation = anim;
        }
    }

    set target(tar: any) {
        if (this.lifeComp) {
            this.lifeComp.target = tar;
        }
    }

    get target(): any {
        return this.lifeComp && this.lifeComp.target;
    }

    set onClick(v: (e: cc.Event) => void) {
        if (this.lifeComp) {
            this.lifeComp.onClick = v;
        }
    }

    get onClick(): (e: cc.Event) => void {
        return this.lifeComp && this.lifeComp.onClick;
    }

    set onLongClick(v: (e: cc.Event) => void) {
        if (this.lifeComp) {
            this.lifeComp.onLongClick = v;
        }
    }

    get onLongClick(): (e: cc.Event) => void {
        return this.lifeComp && this.lifeComp.onLongClick;
    }

    set onPressed(v: (nd: cc.Node, pos: cc.Vec2) => void) {
        if (this.lifeComp) {
            this.lifeComp.onPressed = v;
        }
    }

    get onPressed(): (nd: cc.Node, pos: cc.Vec2) => void {
        return this.lifeComp && this.lifeComp.onPressed;
    }

    set onLongPressed(v: (nd: cc.Node, pos: cc.Vec2) => void) {
        if (this.lifeComp) {
            this.lifeComp.onLongPressed = v;
        }
    }

    get onLongPressed(): (nd: cc.Node, pos: cc.Vec2) => void {
        return this.lifeComp && this.lifeComp.onLongPressed;
    }


    set onDrag(v: (p: cc.Vec2, pDelta: cc.Vec2, pDistance: cc.Vec2) => void) {
        if (this.lifeComp) {
            this.lifeComp.onDrag = v;
        }
    }

    set onRelease(v: (nd: cc.Node, pos: cc.Vec2) => void) {
        if (this.lifeComp) {
            this.lifeComp.onRelease = v;
        }
    }

    public setBubble(bubble: boolean = false) {
        if (this.lifeComp) {
            this.lifeComp.bubble = bubble;
        }
    }
}
