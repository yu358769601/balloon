const {ccclass, property} = cc._decorator;
import Activity from "./Activity"

@ccclass
export default class ActivityPool
{
    dic = {}

    put(name: string, activity: Activity)
    {
        let queue: Array<Activity> = this.dic[name]
        if (queue == null || queue == undefined)
        {
            queue = new Array<Activity>()
            this.dic[name] = queue
        }
        queue.push(activity)
    }
    remove(name:string){
        let queue: Array<Activity> = this.dic[name]
        if (queue != null && queue != undefined){
            this.dic[name] = undefined;
        }
    }


    take(name: string)
    {
        let queue: Array<Activity> = this.dic[name]
        if (queue)
        {
            return queue.shift()
        }
        return null
    }
   
}
