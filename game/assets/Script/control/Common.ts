import {C} from "./Clickable";
import ClickEventHandler, {LifeCycleComp} from "./events/ClickEventHandler";

// @ts-ignore
const assign = Object.assign || false;

export default class Common {

    // 深拷贝多个对象.
    public static deepAssign(...args) {
        let i = 1,
            target = arguments[0] || {},
            deep = false,
            length = arguments.length,
            name, options, src, copy,
            copyIsArray, clone;
        // 如果第一个参数的数据类型是Boolean类型
        // target往后取第二个参数
        if (typeof target === "boolean") {
            deep = target;
            // 使用||运算符，排除隐式强制类型转换为false的数据类型
            // 如'', 0, undefined, null, false等
            // 如果target为以上的值，则设置target = {}
            target = arguments[1] || {};
            i++;
        }

        // 如果target不是一个对象或数组或函数
        if (typeof target !== 'object' && !(typeof target === 'function')) {
            target = {};
        }

        // 如果arguments.length === 1 或
        // typeof arguments[0] === 'boolean',
        // 且存在arguments[1]，则直接返回target对象
        if (i === length) {
            return target;
        }

        // 循环每个源对象
        for (; i < length; i++) {
            // 如果传入的源对象是null或undefined
            // 则循环下一个源对象
            if (typeof (options = arguments[i]) != null) {
                // 遍历所有[[emuerable]] === true的源对象
                // 包括Object, Array, String
                // 如果遇到源对象的数据类型为Boolean, Number
                // for in循环会被跳过，不执行for in循环
                for (name in options) {
                    if (!options.hasOwnProperty(name)) {
                        continue;
                    }
                    // src用于判断target对象是否存在name属性
                    src = target[name];
                    // copy用于复制
                    copy = options[name];
                    // 判断copy是否是数组
                    copyIsArray = Array.isArray(copy);
                    if (deep && copy && (typeof copy === 'object' || copyIsArray)) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            // 如果目标对象存在name属性且是一个数组
                            // 则使用目标对象的name属性，否则重新创建一个数组，用于复制
                            clone = src && Array.isArray(src) ? src : [];
                        } else {
                            // 如果目标对象存在name属性且是一个对象
                            // 则使用目标对象的name属性，否则重新创建一个对象，用于复制
                            clone = src && typeof src === 'object' ? src : {};
                        }
                        // 深复制，所以递归调用copyObject函数
                        // 返回值为target对象，即clone对象
                        // copy是一个源对象
                        target[name] = this.deepAssign(deep, clone, copy);
                    } else if (copy !== undefined && copy !== null) {
                        // 浅复制，直接复制到target对象上
                        target[name] = copy;
                    }
                }
            }
        }
        // 返回目标对象
        return target;
    }

    // 合并两个对象到一起.
    public static assign(_object: any, obj2: any): any {

        const object = _object || {};

        if (!assign) {
            Object.defineProperty(Object, "assign", {
                enumerable: false,
                configurable: true,
                writable: true,
                value(target, firstSource) {
                    "use strict";
                    if (target === undefined || target === null) {
                        throw new TypeError("Cannot convert first argument to object");
                    }
                    const to = Object(target);
                    for (let i = 1; i < arguments.length; i++) {
                        const nextSource = arguments[i];
                        if (nextSource === undefined || nextSource === null) {
                            continue;
                        }
                        const keysArray = Object.keys(Object(nextSource));
                        for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                            const nextKey = keysArray[nextIndex];
                            const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                            if (desc !== undefined && desc.enumerable) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                    return to;
                },
            });
        }
        if (!obj2) {
            return object;
        }
        // @ts-ignore
        return assign(object, obj2);
    }

    // 合并多个对象到一起.
    public static assignM(object: any, ...objs: any[]): any {
        let ret = object;
        for (const i of objs) {
            ret = Common.assign(ret, i);
        }
        return ret;
    }

    public static next(a): boolean {
        for (const key in a) {
            const element = a[key];
            if (null != element) {
                return true;
            }
        }

        return false;
    }

    public static gc() {
        cc.sys.garbageCollect();
    }

    // 判断是否是手机平台.
    public static get isMobile(): boolean {
        return (cc.sys.isMobile || cc.sys.platform === cc.sys.WECHAT_GAME || cc.sys.platform === cc.sys.QQ_PLAY);
    }

    // 快捷设置图片spriteFrame. mode = 0 按sprite 设定显示模式, mode = 1 centerInside; mode=2 origin按图片大小显示.
    public static setSprite(sprite: cc.Sprite, spriteFrame: cc.SpriteFrame, mode: number = 0) {
        sprite.spriteFrame = spriteFrame;
        if (spriteFrame) {
            switch (mode) {
                case 1: {
                    const wF = sprite.node.width / spriteFrame.getRect().width;
                    const hF = sprite.node.height / spriteFrame.getRect().height;
                    if (wF < hF) {
                        sprite.node.height = wF * spriteFrame.getRect().height;
                    } else {
                        sprite.node.width = hF * spriteFrame.getRect().width;
                    }
                    break
                }
                case 2: {
                    sprite.node.width = spriteFrame.getRect().width;
                    sprite.node.height = spriteFrame.getRect().height;
                    break
                }
            }
        }
    }

    // 以下事件如果同时存在时, 一定要保证target 是同一对象.否则可能导致无法收到事件 .
    public static setClickListenerAnim(node: cc.Node | cc.Component, anim: boolean, clickListener: (ev: cc.Event, param?: any) => void, target: any, params: any = null) {
        const evHandler = this.getNodeEventHandler(node);
        if (!evHandler) {
            return;
        }

        const callback = function (ev: cc.Event) {
            if (C.getT(ev).isOk) {
                clickListener.call(this, ev, params);
            }
        };
        let nd = node instanceof cc.Component ? node.node : node;
        if (anim) {
            // @ts-ignore, 增加内置属性用于记录节点原始坐标.
            const sX = nd.pscaleX ? nd.pscaleX : nd.scaleX;
            // @ts-ignore
            const sY = nd.pscaleY ? nd.pscaleY : nd.scaleY;
            // @ts-ignore
            nd.pscaleX = sX, nd.pscaleY = sY;
        }
        evHandler.target = target;
        evHandler.onClick = callback;

        if (!evHandler.pressedAnim) {
            // @ts-ignore
            evHandler.pressedAnim = anim ? cc.scaleTo(0.1, 0.9 * nd.pscaleX, 0.9 * nd.pscaleY) : null;
        }
        if (!evHandler.releaseAnim) {
            // @ts-ignore
            evHandler.releaseAnim = anim ? cc.scaleTo(0.1, nd.pscaleX, nd.pscaleY) : null;
        }
    }

    public static setDragListener(node: cc.Node | cc.Component, dragListener: (p: cc.Vec2, pDelta: cc.Vec2, pDistance: cc.Vec2) => void, target: any) {
        const evHandler = this.getNodeEventHandler(node);
        if (!evHandler) {
            return;
        }
        evHandler.target = target;
        evHandler.onDrag = dragListener;
    }

    public static setLongClickListener(node: cc.Node | cc.Component, longClickListener: (ev: cc.Event) => void, target: any) {
        const evHandler = this.getNodeEventHandler(node);
        if (!evHandler) {
            return;
        }
        evHandler.target = target;
        evHandler.onLongClick = longClickListener;
    }

    public static setLongPressedListener(node: cc.Node | cc.Component, longPressedListener: (nd: cc.Node, ev: cc.Vec2) => void, target: any) {
        const evHandler = this.getNodeEventHandler(node);
        if (!evHandler) {
            return;
        }
        evHandler.target = target;
        evHandler.onLongPressed = longPressedListener;
    }

    public static setPressedListener(node: cc.Node | cc.Component, pressedListener: (nd: cc.Node, ev: cc.Vec2) => void, target: any) {
        const evHandler = this.getNodeEventHandler(node);
        if (!evHandler) {
            return;
        }
        evHandler.target = target;
        evHandler.onPressed = pressedListener;
    }

    public static setOnReleaseListener(node: cc.Node | cc.Component, relaseListener: (nd: cc.Node, ev: cc.Vec2) => void, target: any) {
        const evHandler = this.getNodeEventHandler(node);
        if (!evHandler) {
            return;
        }
        evHandler.target = target;
        evHandler.onRelease = relaseListener;
    }

    public static setClickAnim(node: cc.Node | cc.Component, pressAnim: cc.Action, releaseAnim: cc.Action) {
        const evHandler = this.getNodeEventHandler(node);
        if (!evHandler) {
            return;
        }
        // @ts-ignore
        evHandler.pressedAnim = pressAnim;
        // @ts-ignore
        evHandler.releaseAnim = releaseAnim;
    }

    // 主动触发点击事件,执行点击操作.
    public static performClick(node: cc.Node | cc.Component, params: any = null) {
        const evHandler = this.getNodeEventHandler(node);
        if (!evHandler || !evHandler.onClick) {
            return;
        }
        const event = new cc.Event("performClick", true);
        event.target = evHandler.target.node;
        evHandler.onClick.call(evHandler.target, event, params)
    }

    // 主动触发长按点击事件.
    public static performLongClick(node: cc.Node | cc.Component, params: any = null) {
        const evHandler = this.getNodeEventHandler(node);
        if (!evHandler || !evHandler.onLongClick) {
            return;
        }
        const event = new cc.Event("performLongClick", true);
        event.target = evHandler.target.node;
        evHandler.onLongClick.call(evHandler.target, event, params)
    }

    // 主动触发长按事件.
    public static performPressed(node: cc.Node | cc.Component, params: any = null) {
        const evHandler = this.getNodeEventHandler(node);
        if (!evHandler || !evHandler.onPressed) {
            return;
        }
        const event = new cc.Event("performPressed", true);
        event.target = evHandler.target.node;
        evHandler.onPressed.call(evHandler.target, event, params)
    }

    // 主动触发长按事件.
    public static performLongPressed(node: cc.Node | cc.Component, params: any = null) {
        const evHandler = this.getNodeEventHandler(node);
        if (!evHandler || !evHandler.onLongPressed) {
            return;
        }
        const event = new cc.Event("performLongPressed", true);
        event.target = evHandler.target.node;
        evHandler.onLongPressed.call(evHandler.target, event, params);
    }

    // 点击点击事件移除绑定.
    public static removeClickListener(node: cc.Node | cc.Component) {
        const evHandler: ClickEventHandler = this.getNodeEventHandler(node);
        if (evHandler) {
            evHandler.onClick = null;
        }
    }

    // 移除长按事件绑定
    public static removeLongClickListener(node: cc.Node | cc.Component) {
        const evHandler: ClickEventHandler = this.getNodeEventHandler(node);
        if (evHandler) {
            evHandler.onLongClick = null;
        }
    }

    // 移除拖拽事件.
    public static removeDragListener(node: cc.Node | cc.Component) {
        const evHandler: ClickEventHandler = this.getNodeEventHandler(node);
        if (evHandler) {
            evHandler.onDrag = null;
        }
    }

    // 设置事件是否应被自身拦截掉.
    public static setBubble(node: cc.Node | cc.Component, bubble: boolean) {
        const evHandler: ClickEventHandler = this.getNodeEventHandler(node);
        if (evHandler) {
            evHandler.setBubble(bubble);
        }
    }

    private static getNodeEventHandler(node: cc.Node | cc.Component): ClickEventHandler {
        const nd = (node instanceof cc.Component) ? node.node : node;
        if (!(nd instanceof cc.Node)) {
            console.info("setClickListener node param incorrect!");
            return null;
        }
        let evHandler: ClickEventHandler = null;
        // @ts-ignore
        if (nd._eventHandler) {
            // @ts-ignore
            evHandler = nd._eventHandler as ClickEventHandler;
        } else {
            evHandler = new ClickEventHandler(nd);
        }
        return evHandler;
    }

    public static clearEvents(node: cc.Node | cc.Component) {
        const nd = (node instanceof cc.Component) ? node.node : node;
        if (!(nd instanceof cc.Node)) {
            console.info("setClickListener node param incorrect!");
            return null;
        }
        if (nd.getComponent(LifeCycleComp)) {
            nd.removeComponent(LifeCycleComp);
        }
    }

}
