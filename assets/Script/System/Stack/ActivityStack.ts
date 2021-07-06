// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import UIStack from "./UIStack";
import Activity from "../Ui/Activity";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ActivityStack {
    static stack: UIStack<Activity> = new UIStack<Activity>()
    // ActivityStack.push(activity)
    static push(activity:Activity){
        if (this.find(activity.name) == null) {
            this.stack.push(activity)
        }

        this.getStackLog()
    }



    static pop():Activity{
        let pp = this.stack.pop()
        this.getStackLog()
       return pp
    }
    //ActivityStack.remove(name)
    static remove(name : string){

        for (let i = 0; i < this.stack.count; i++) {
            cc.log("对比",this.stack._store[i].node.name)
            if (  this.stack._store[i].node.name == name) {
               this.stack._store.splice(i, 1);
                this.getStackLog()
                return
            }
        }
    }

    //ActivityStack.getStack()
    static getStack():any{
        return this.stack
    }
    static find(name : string):any{
        for (var i = 0; i < this.stack.count; i++) {
            if (this.stack._store[i].node.name == name) {
                return  this.stack._store[i]
            }
        }
        return null
    }

    static getStackLog(){
        let temps = {}
        for (var i = 0; i < this.stack.count; i++) {
            temps[i] = this.stack._store[i].node.name
        }
        // cc.log("栈信息",temps)
    }

}