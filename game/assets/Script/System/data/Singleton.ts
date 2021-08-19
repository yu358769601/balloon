// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Singleton
{
    //其实实际的开发项目中，不一定会用到数组，有可能会把数组之类的进行封装
    /** 存放初始化过的构造函数,这里用数组来存放构造函数 **/
    private static classKeys:Function[] = [];
    private static classValues:any[] = [];

    constructor()
    {
        let clazz: any = this["constructor"];
        //为空时，表示浏览器不支持这样读取构造函数
        if (!clazz)
            return;
        // 防止重复实例化
        if (Singleton.classKeys.indexOf(clazz) != -1)
            throw new Error(this + " 只允许实例化一次！");
        else
        {
            Singleton.classKeys.push(clazz);
            Singleton.classValues.push(this);
        }

    }
    /**
     * 销毁方法。事实上单例是很少进行销毁的
     */
    destroy(o: any = null): void
    {
        this.onDestroy();
        Singleton.removeInstance(this["constructor"]);
    }

    /**
     * 子类重写的方法
     */
    protected onDestroy(): void
    {

    }
    /**
     * 删除单例的实例（不对单例本身做任何的销毁，只是删除他的引用）
     * @param clazz 单例的Class对象
     *
     */
    static removeInstance(clazz: Function): void
    {
        var index: number = this.classKeys.indexOf(clazz);
        if (index == -1)
        {
            return null;
        }
        this.classKeys.splice(index, 1);
        this.classValues.splice(index, 1);
    }

    /**
     * 是否存放有这个构造函数
     * @param clazz 构造函数
     * @return {boolean}
     */
    static getFunValue(clazz: Function):any
    {
        let funs:Function[] = this.classKeys;
        let length:number = funs.length;
        for(let i:number = 0; i < length; i++)
        {
            if(clazz == funs[i])
                return this.classValues[i];
        }
        return null;
    }

    /**
     * 获取单例类，若不存在则创建.所有的单例创建的时候，都必须使用这个方法来创建，这样可以做到统一管理单例
     * @param clazz 任意需要实现单例效果的类
     * @return
     *
     */
    static getInstanceOrCreate(clazz:any): any
    {
        var obj: any = this.getFunValue(clazz);
        if (obj)
        {
            return obj;
        }
        obj = new clazz();
        //不是Singleton的子类，则手动添加Singleton构造器会自动添加到classMap
        if (!(obj instanceof Singleton))
        {
            this.classKeys.push(clazz);
            this.classValues.push(obj);
        }
        return obj;
    }
}