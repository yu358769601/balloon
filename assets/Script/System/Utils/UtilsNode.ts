import LoadManage from "../Load/LoadManage";
import Vec2 = cc.Vec2;
import ccLog from "../Log/ccLog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UtilsNode extends cc.Component {


    /**
     *
     * @param nodeName
     * @param parent
     *
     *
     async getNodes(){
        let node1 =await UtilsNode.getNode("monster_pre",this.node);

        // let node2 = UtilsNode.getNode("monster_pre",this.node);
        cc.log(" 有怪物吗9898 ",node1.name);
    }
     */
    static async getNode(nodeName:string ,parent : cc.Node): Promise<cc.Node>{
        let pre = await LoadManage.initLoadForName(nodeName);
        // cc.log("真的有吗",pre)
        return new Promise<cc.Node>((resolve, reject) => {
            // this.loadRes(this.getforName(name), (error, prefab) => {
            //     // cc.log("加载 什么错误吗",error,prefab)
            //     if (error == null) {
            //         resolve(prefab)
            //     }
            //     else {
            //         resolve(null)
            //     }
            // })
            if (pre != null) {
                let node = cc.instantiate(pre)
                parent.addChild(node)
                // cc.log("有这个 9527  ",node.name )
                resolve(node)
            }
            // cc.log("没有这个 ",nodeName )
            resolve(null)
        })
    }
    static async getNodeNoParent(nodeName:string): Promise<cc.Node>{
        let pre = await LoadManage.initLoadForName(nodeName);
        // cc.log("真的有吗",pre)
        return new Promise<cc.Node>((resolve, reject) => {
            // this.loadRes(this.getforName(name), (error, prefab) => {
            //     // cc.log("加载 什么错误吗",error,prefab)
            //     if (error == null) {
            //         resolve(prefab)
            //     }
            //     else {
            //         resolve(null)
            //     }
            // })
            if (pre != null) {
                let node = cc.instantiate(pre)
                // cc.log("有这个 9527  ",node.name )
                resolve(node)
            }
            // cc.log("没有这个 ",nodeName )
            resolve(null)
        })
    }

    //得到一个 node 从对象池
    // let node1 =await UtilsNode.getNodeFromPool("monster_pre",this.node);
    static async getNodeFromPool(nodeName:string ,parent : cc.Node): Promise<cc.Node>{

        let nameNode = await LoadManage.initLoadForName(nodeName);
        ccLog.log("开始跳了吗 node",nameNode,nodeName)

        let namePool = await LoadManage.initLoadForNameFromPool(nodeName);
        ccLog.log("开始跳了吗 从对象池里面拿出来",namePool)

        ccLog.log("开始跳了吗 namePool",namePool)
        ccLog.log("开始跳了吗 nameNode",nameNode)

        return new Promise<cc.Node>((resolve, reject) => {
            // this.loadRes(this.getforName(name), (error, prefab) => {
            //     // cc.log("加载 什么错误吗",error,prefab)
            //     if (error == null) {
            //         resolve(prefab)
            //     }
            //     else {
            //         resolve(null)
            //     }
            // })

            let node
            if (namePool != null) {

                if (namePool.size() > 0) {
                    //_1、从对象池中获取对象
                    node = namePool.get();
                    // cc.log("我有什么组件 取出来的"," 名字 ",nodeName," 我都有什么属性 ",node)
                } else {

                    //_2、若没有空闲的对象，也就是对象不够用时，就克隆节点
                    node = cc.instantiate(nameNode);
                    // cc.log("我有什么组件 创建出来的"," 名字 ",nodeName," 我都有什么属性 ",node)
                }

                // node.getComponent(nodeName).init()
                // let node = cc.instantiate(pre)
                parent.addChild(node)
                resolve(node)
            }
            // cc.log("没有这个 ",nodeName )
            resolve(null)
        })
    }
    //回收
    // UtilsNode.setNodeFromPool(nodeName,node)
    static  setNodeFromPool(nodeName:string,node){
       let pool = LoadManage.getforNamePool(nodeName)
        if (pool) {
            // cc.log("要被回收了我的名字是 ",nodeName)
            pool.put(node);
        }

    }


    // UtilsNode.changeParent(node,parent)
    static  changeParent(node:cc.Node ,parent : cc.Node){
        let pos1 = node.convertToWorldSpaceAR(new Vec2(0,0));
        let pos2 = parent.convertToNodeSpaceAR(pos1);
        node.setPosition(pos2)
        node.parent = parent
    }

    /**
     * UtilsNode.isComponent(node, componentName)
     * 检查是否有这个组件在这个node 上面
     * @param node 被检测的node
     * @param componentName 组件名字
     */
    static  isComponent(node:cc.Node ,componentName : string):boolean{
       let component = node.getComponent(componentName)
        if (component !=null) {
            return true
        }else{
            return false
        }
    }

    /**
     * UtilsNode.addComponent(node, componentName)
     * 添加组件 如果原本没有就添加上 原本有就不添加
     * @param node 需要被添加组件的 node
     * @param componentName 添加的组件的名字
     */
    static  addComponent(node:cc.Node ,componentName : string):boolean{
        if (this.isComponent(node, componentName) == true) {
            return false
        }else{
            node.addComponent(componentName)
            return true
        }
    }
    static  setComponent(node:cc.Node ,componentName : string){
        if (this.isComponent(node, componentName) == true) {
            this.removeComponent(node,componentName)
        }


        return node.addComponent(componentName)
    }
    /**
     * UtilsNode.removeComponent(node, componentName)
     * 删除组件
     * @param node 需要被添加组件的 node
     * @param componentName 添加的组件的名字
     */
    static  removeComponent(node:cc.Node ,componentName : string):boolean{
        if (this.isComponent(node, componentName) == true) {
            node.removeComponent(componentName)
            return true
        }else{
            return false
        }
    }

    //删除这个节点下面的 所有子孩子
    // UtilsNode.removeAllChildren(node)
    static removeAllChildren(node){
        if (node == null) {
            return
        }
        for (let i = node.children.length - 1; i >= 0; i--) {
            let itemNode = node.children[i];
            if (itemNode) {
                // If you don't do cleanup, the node's actions will not get removed and the
                itemNode.cleanup();
                itemNode.parent = null;
                itemNode.destroy()
            }
        }
    }

    // UtilsNode.show(node,b)
    static show(node,b,opacity ?){
        if (b == true) {
            node.active = true
            if (opacity !=null) {
                node.opacity = opacity
            }else{
                node.opacity = 255
            }

        }else{
            node.opacity = 0
            node.active = false
        }
    }

}
