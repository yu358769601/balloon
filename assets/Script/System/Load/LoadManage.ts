// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import ccLog from "../Log/ccLog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadManage{
    //键值对 预制体 前面是路径后面是 预制体
    static _loadResCache: {[path: string]: Object} = {}
    static _loadResCachePool: {[path: string]: Object} = {}

    //预制体 名字 后面对应着路径 LoadManage._loadResNamePath[]
    static _loadResNamePath: {[path: string]: string} = {}

    static _loadResNamePoolPath: {[path: string]: string} = {}

    static _loadResNameNodePoolPath: {[path: string]: cc.NodePool} = {}

    //初始化
    //LoadManage.init()
    public static initData(loadResNamePath : {[path: string]: string}){

        this._loadResNamePath = loadResNamePath
    }
    //LoadManage.getData()
    public static getData(){

       return this._loadResNamePath
    }
    public static addPool(listPool){
        for (let item in listPool) {
            if (this._loadResNameNodePoolPath[item] == null) {
                this._loadResNameNodePoolPath[item] = new cc.NodePool(item)
                cc.log("内容是 0 ? ",this._loadResNameNodePoolPath[item],item)
            }
        }
        cc.log("内容是 1 ? ",this._loadResNameNodePoolPath)
        // for (let i = 0; i < ; i++) {
        //     // _loadResNameNodePoolPath
        // }

    }
    public static initPool(loadResNamePoolPath : {[path: string]: string}){

        this._loadResNamePoolPath = loadResNamePoolPath

        for (let i in this._loadResNamePoolPath) {
            // cc.log('index:', i, 'value:', this._loadResNamePoolPath[i])
            this._loadResNameNodePoolPath[i] = new cc.NodePool(i)
            // this._loadResNameNodePoolPath[i].size()
        }
        // cc.log("内容是? ",this._loadResNameNodePoolPath)
        // for (let i = 0; i < ; i++) {
        //     // _loadResNameNodePoolPath
        // }

    }
    //得到这个对象池
    static getforNamePool(name: string): any
    {
        // cc.log("要找什么没有",name ,"现在这里 有什么啊",this._loadResNameNodePoolPath)
        let obj = this._loadResNameNodePoolPath[name]
        // let nameget = this._loadResCache[obj]
        // ccLog.log("返回什么222",obj,this._loadResNameNodePoolPath,"名字 ",name)
        // cc.log("返回什么111 这里都有什么",this._loadResNamePath)
        return obj
    }
    static getforNamePoolPath(name: string): string
    {
        // cc.log("要找什么没有",name ,"现在这里 有什么啊",this._loadResNamePoolPath)
        let obj = this._loadResNamePoolPath[name]
        // let nameget = this._loadResCache[obj]
        // cc.log("返回什么111",obj)
        // cc.log("返回什么111 这里都有什么",this._loadResNamePath)
        return obj
    }
    // LoadManage.getforName(name)
    static getforName(name: string): any
    {
        // cc.log("要找什么没有",name ,"现在这里 有什么啊",this._loadResNamePath)
        let obj = this._loadResNamePath[name]
        // let nameget = this._loadResCache[obj]
        // ccLog.log("返回什么333",obj,name)
        // cc.log("返回什么111 这里都有什么",this._loadResNamePath)
        return obj
    }
    static getforPath(path: string): any
    {

        let pathget= this._loadResCache[path]
        return pathget
    }
    //LoadManage.getJsonForName("monster_json)
    static async getJsonForName(name: string): Promise<cc.JsonAsset> {

        return new Promise<cc.JsonAsset>((resolve, reject) => {
            this.loadRes(this.getforName(name), cc.JsonAsset,(error, prefab) => {
                // cc.log("加载 什么错误吗",error,prefab)
                if (error == null) {
                    resolve(prefab)
                }
                else {
                    resolve(null)
                }
            })
        })
    }
    //LoadManage.initLoad
    static async initLoadForPath(path: string): Promise<cc.Prefab> {

        return new Promise<cc.Prefab>((resolve, reject) => {
             this.loadRes(path, cc.Prefab,(error, prefab) => {
                // cc.log("加载 什么错误吗",error,prefab)
                if (error == null) {
                    resolve(prefab)
                }
                else {
                    resolve(null)
                }
            })
        })

    }
    // 经常用这个 重点
    static async initLoadForName(name: string): Promise<cc.Prefab> {

        return new Promise<cc.Prefab>((resolve, reject) => {
            this.loadRes(this.getforName(name), cc.Prefab,(error, prefab) => {
                // cc.log("加载 什么错误吗",error,prefab)
                if (error == null) {
                    resolve(prefab)
                }
                else {
                    resolve(null)
                }
            })
        })
    }
    // 经常用这个 重点
    static async initLoadForNameFromPool(name: string): Promise<cc.NodePool> {

        return new Promise<cc.NodePool>((resolve, reject) => {
            this.loadResPool(name, (error, prefab) => {
                // cc.log("加载 什么错误吗",error,prefab)
                if (error == null) {
                    resolve(prefab)
                }
                else {
                    resolve(null)
                }
            })
        })
    }
    //LoadManage.getSpriteForName(SpriteForName)
    // this.itemBG.spriteFrame = mySpriteFrame
    //new cc.SpriteFrame
    static async getSpriteForName(name: string): Promise<cc.SpriteFrame> {

        return new Promise<cc.SpriteFrame>((resolve, reject) => {
            this.loadRes(this.getforName(name),cc.SpriteFrame, (error, prefab) => {
                // cc.log("加载 什么错误吗",error,prefab)
                if (error == null) {
                    resolve(prefab)
                }
                else {
                    resolve(null)
                }
            })
        })
    }
    //LoadManage.getAnimationClip(AnimationClipName)
    static async getAnimationClip(name: string): Promise<cc.AnimationClip> {

        return new Promise<cc.AnimationClip>((resolve, reject) => {
            this.loadRes(this.getforName(name),cc.AnimationClip, (error, prefab) => {
                // cc.log("加载 什么错误吗",error,prefab)
                if (error == null) {
                    resolve(prefab)
                }
                else {
                    resolve(null)
                }
            })
        })
    }
    // LoadManage.getFont(FontName)
    static async getFont(name: string): Promise<cc.Font> {

        return new Promise<cc.Font>((resolve, reject) => {
            this.loadRes(this.getforName(name),cc.Font, (error, prefab) => {
                // cc.log("加载 什么错误吗",error,prefab)
                if (error == null) {
                    resolve(prefab)
                }
                else {
                    resolve(null)
                }
            })
        })
    }


    //得到这个名字的sp
    // LoadManage.getSkeletonDataForName(name)
    static async getSkeletonDataForName(name: string): Promise<sp.SkeletonData> {

        return new Promise<sp.SkeletonData>((resolve, reject) => {
            this.loadRes(this.getforName(name),sp.SkeletonData, (error, prefab) => {
                // cc.log("加载 什么错误吗",error,prefab)
                if (error == null) {
                    resolve(prefab)
                }
                else {
                    resolve(null)
                }
            })
        })
    }
    //加载声音
    //LoadManage.getAudioClipForName(name)
    static async getAudioClipForName(name: string): Promise<cc.AudioClip> {

        return new Promise<cc.AudioClip>((resolve, reject) => {
            this.loadRes(this.getforName(name),cc.AudioClip, (error, prefab) => {
                // cc.log("加载 什么错误吗",error,prefab)
                if (error == null) {
                    resolve(prefab)
                }
                else {
                    resolve(null)
                }
            })
        })
    }

    //LoadManage.loadRes()
    static  loadRes(path: string, type, cb: (error, res) => void ): void
    {
        let obj = this._loadResCache[path]

        if(obj != null)
        {
            // cc.log("这里走过吗 重要",obj)
            cb(null, obj)
            return
        }
        // cc.log("这里走过吗 重要 准备加载",path)
        //加载本地图片 预制体
         cc.resources.load(path, type,(error, res) =>{
             // cc.log("加载 什么错误吗",error,res)

                 if(error == null)
                 {
                     this._loadResCache[path] = res
                     // cc.log("这里走过吗 重要 资料存在现在放在这里了",this._loadResCache[path])
                     cb(error, res)
                     return
                 }
                 else
                 {
                     // 如果资源不存在
                     let index = -1
                     if(error.message != null)
                     {
                         index = error.message.indexOf("does not exist.")
                     }
                     if(index != -1)
                     {
                         cb(error, res)
                         return;
                     }

                     cb(error, res)
                     return;

                     // 如果是音频文件下载失败
                     // if(path.search("Sound/") >= 0)
                     // {
                     //     cb(error, res)
                     //     return;
                     // }

                     // // 如果是微信超过了储存限制
                     // if(SDK.isWX && wxDownloader != undefined && wxDownloader.cleanAllAssets != null)
                     // {
                     //     console.log(error)
                     //     var msg: string = null
                     //     if(error.message != null)
                     //     {
                     //         msg = error.message
                     //     }
                     //     if(error["errorMessage"] != null)
                     //     {
                     //         msg = error["errorMessage"]
                     //     }
                     //     var i = msg.indexOf("saveFile:fail the maximum size of the file storage limit is exceeded")
                     //     if(i != -1)
                     //     {
                     //         console.log("cleanWx")
                     //         wxDownloader.cleanAllAssets()
                     //     }
                     // }
                     // let retryItem =
                     //     {
                     //         path: path,
                     //         cb: cb,
                     //     }
                     // this.retryList.push(retryItem)
                     // this.updating = true
                     return
                 }




        })
    }
    static  loadResPool(path: string, cb: (error, res) => void ): void
    {
        let obj = this._loadResNameNodePoolPath[path]
        // cc.log("会有的吧 重要",obj)
        ccLog.log("开始跳了吗 1 namePool",path,this._loadResNameNodePoolPath)
        if(obj != null)
        {
            // cc.log("这里走过吗 重要",obj)
            cb(null, obj)
            return
        }

    }
    //加载
    static initLoad(loadRes){
        for (let item in loadRes) {
            this._loadResNamePath[item] = loadRes[item]
        }

    }


    // LoadManage.starLoad()
    static async starLoad(loadRes,callbacks){
        let count = 0
        for (let item in loadRes) {
            count++
            this._loadResNamePath[item] = loadRes[item]
        }
        // console.log("原本加载长度",this._loadResNamePath);

        let currentCount = 0
        for (let item in loadRes) {

            // ccLog.log("每条是啥具体",loadRes[item]);
            let prefabPromise =await this.initLoadForName(item)
            //     .then(result => {
            //     console.log(result);
            // });
            currentCount++
            // prefabPromise.then(result => {
            //     console.log(result);
            //
            // });
            // ccLog.log("每条是啥 进度",item);
            // ccLog.log("进度",currentCount,"/",count);
            // ccLog.log("进度",currentCount,"/",count)

            if (callbacks.schedule) {
                callbacks.schedule(currentCount,count)
            }
            if (callbacks.itemCallback) {
                callbacks.itemCallback(item)
            }

        }
        if (callbacks.scheduleEnd) {
            callbacks.scheduleEnd(currentCount,count)
        }

        return
        // setTimeout(() => {
        //     console.log("有延时?");
        //
        // },5000);
        // console.log("加载 完毕",LoadManager.getLoadRes());



    }
    //只登记不加载
    static  starNotLoad(loadRes){
        let count = 0
        for (let item in loadRes) {
            count++
            this._loadResNamePath[item] = loadRes[item]
        }
        // console.log("原本加载长度",this._loadResNamePath);


        // setTimeout(() => {
        //     console.log("有延时?");
        //
        // },5000);
        // console.log("加载 完毕",LoadManager.getLoadRes());

    }
    //加载所有目前有的
    static async starAllLoad(){
        let myCountEnd = 0

        for (let item in this._loadResNamePath) {
            myCountEnd++
        }
        let myCount = 0
        for (let item in this._loadResNamePath) {

           await this.starLoadByName(item,{
                schedule : (currentCount,count)=>{
                    // cc.log("回调进度",currentCount,"/",count);
                    // this.loadbar.progress = currentCount/count
                    myCount++
                    // ccLog.log("每条是啥 进度",item);
                    // ccLog.log("进度",myCount,"/",myCountEnd);
                },
                itemCallback : async (item)=>{
                    // cc.log("图片加载完成",item);
                    // this.tempSprite.spriteFrame = await LoadManage.getSpriteForName(item)
                },
                scheduleEnd : ()=>{

                    // ccLog.log("都有什么缓存 ",LoadManage._loadResCache)
                }
            })
        }
        // console.log("原本加载长度",this._loadResNamePath);


        // setTimeout(() => {
        //     console.log("有延时?");
        //
        // },5000);
        // console.log("加载 完毕",LoadManager.getLoadRes());

    }


    // LoadManage.starLoadByName(name,callbacks)
    static async starLoadByName(name,callbacks){
            // ccLog.log("每条是啥",item);
            // ccLog.log("每条是啥具体",loadRes[item]);
            let prefabPromise =await this.initLoadForName(name)
            //     .then(result => {
            //     console.log(result);
            // });
            // prefabPromise.then(result => {
            //     console.log(result);
            //
            // });
            // cc.log("进度",currentCount,"/",count);
            // ccLog.log("进度",currentCount,"/",count)

            if (callbacks.schedule) {
                callbacks.schedule(name)
            }
            if (callbacks.scheduleEnd) {
                callbacks.scheduleEnd()
            }

        return
        // setTimeout(() => {
        //     console.log("有延时?");
        //
        // },5000);
        // console.log("加载 完毕",LoadManager.getLoadRes());



    }
}
