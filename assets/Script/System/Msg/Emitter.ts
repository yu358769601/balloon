// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;



@ccclass
/**
 * 事件
 */
export default class Emitter {
    /** 监听数组 */
    private static listeners = {};

    /**
     * 注册事件
     * @param name 事件名称
     * @param callback 回调函数
     * @param context 上下文
     */
    public static register(name: string, callback: Function, context: any) {
        let observers: Observer[] = Emitter.listeners[name];
        if (!observers) {
            Emitter.listeners[name] = [];
        }
        Emitter.listeners[name].push(new Observer(callback, context));

    }

    /**
     * 移除事件
     * @param name 事件名称
     * @param callback 回调函数
     * @param context 上下文
     */
    public static remove(name: string, callback: Function, context: any) {
        let observers: Observer[] = Emitter.listeners[name];
        if (!observers) return;
        let length = observers.length;
        for (let i = 0; i < length; i++) {
            let observer = observers[i];
            if (observer.compar(context)) {
                observers.splice(i, 1);
                break;
            }
        }
        if (observers.length == 0) {
            delete Emitter.listeners[name];
        }
    }

    /**
     * 发送事件
     * @param name 事件名称
     */
    public static fire(name: string, ...args: any[]) {
        let observers: Observer[] = Emitter.listeners[name];
        if (!observers) return;
        let length = observers.length;
        for (let i = 0; i < length; i++) {
            let observer = observers[i];
            observer.notify(name, ...args);
        }
    }
}

/**
 * 观察者
 */
class Observer {
    /** 回调函数 */
    private callback: Function = null;
    /** 上下文 */
    private context: any = null;

    constructor(callback: Function, context: any) {
        let self = this;
        self.callback = callback;
        self.context = context;
    }

    /**
     * 发送通知
     * @param args 不定参数
     */
    notify(...args: any[]): void {
        let self = this;
        if(self == undefined||self.callback == undefined)
        {
            return;
        }
       return self.callback.call(self.context, ...args);
    }

    /**
     * 上下文比较
     * @param context 上下文
     */
    compar(context: any): boolean {
        return context == this.context;
    }
}
